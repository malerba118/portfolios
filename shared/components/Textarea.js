// Import React dependencies.
import React, {
  useCallback,
  useMemo,
  useState,
  useRef,
  useEffect,
} from "react";
import ReactDOM from "react-dom";
import {
  Flex,
  Button,
  Icon,
  Textarea as ChakraTextarea,
  ListItem,
  OrderedList,
  UnorderedList,
  Text,
  Heading,
  IconButton,
  ButtonGroup,
  Link,
  Box,
  Input,
  InputGroup,
  InputRightElement,
  FormControl,
  StylesProvider,
  Alert,
} from "@chakra-ui/react";
import isUrl from "is-url";
// Import the Slate components and React plugin.
import { withHistory } from "slate-history";
import isHotkey from "is-hotkey";
import { Editable, withReact, useSlate, Slate, ReactEditor } from "slate-react";
import {
  Editor,
  Transforms,
  createEditor,
  Element as SlateElement,
  Range,
} from "slate";
import {
  BsListUl,
  BsListOl,
  BsTypeUnderline,
  BsTypeBold,
  BsTypeItalic,
  BsLink,
} from "react-icons/bs";
import { CgFormatHeading, CgCheck, CgClose } from "react-icons/cg";
import _styles from "./Textarea.module.css";
import * as styles from "../utils/styles";

const withLinks = (editor) => {
  const { insertData, insertText, isInline } = editor;

  editor.isInline = (element) => {
    return element.type === "link" ? true : isInline(element);
  };

  editor.insertText = (text) => {
    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertText(text);
    }
  };

  editor.insertData = (data) => {
    const text = data.getData("text/plain");

    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};

const insertLink = (editor, url, lastKnownSelection) => {
  if (editor.selection || lastKnownSelection) {
    wrapLink(editor, url, lastKnownSelection);
  }
};

const isLinkActive = (editor) => {
  const [link] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "link",
  });
  return !!link;
};

const unwrapLink = (editor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "link",
  });
};

const wrapLink = (editor, url, lastKnownSelection) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }

  let { selection } = editor;
  selection = lastKnownSelection || selection;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link = {
    type: "link",
    url,
    children: isCollapsed ? [{ text: url }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: "end" });
  }
};

const useLastSelection = () => {
  const { selection } = useSlate();
  const ref = useRef(selection);

  useEffect(() => {
    if (selection) {
      ref.current = selection;
    }
  }, [selection]);

  return ref.current;
};

const Toolbar = ({ className }) => {
  const [editingLink, setEditingLink] = useState(false);
  const [link, setLink] = useState("");
  const editor = useSlate();
  const lastKnownSelection = useLastSelection();

  return (
    <Flex overflow="hidden" className={className}>
      <ButtonGroup
        pos="relative"
        size="sm"
        isAttached
        rounded="sm"
        overflow="hidden"
        display="flex"
        flex={1}
        colorScheme="gray"
      >
        <MarkButton format="bold" icon={<BsTypeBold />} />
        <MarkButton format="italic" icon={<BsTypeItalic />} />
        <MarkButton format="underline" icon={<BsTypeUnderline />} />
        <LinkButton
          onMouseDown={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setEditingLink(true);
          }}
        />
        {/* <MarkButton format="code" icon="code" /> */}
        <BlockButton
          format="heading-one"
          icon={<Icon as={CgFormatHeading} fontSize="xl" />}
        />
        <BlockButton
          format="heading-two"
          icon={<Icon as={CgFormatHeading} fontSize="md" />}
        />
        <BlockButton format="numbered-list" icon={<BsListOl />} />
        <BlockButton format="bulleted-list" icon={<BsListUl />} />
        {editingLink && (
          <Box zIndex={1} position="absolute" inset={0} bg="gray.200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("maybe");
              }}
            >
              <InputGroup size="md" colorScheme="gray">
                <Input
                  size="sm"
                  placeholder="Url..."
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  focusBorderColor="gray.200"
                  _hover={{ borderColor: "gray.200" }}
                  // onFocus={() => {
                  //   Transforms.select(editor, lastKnownSelection);
                  // }}
                  // _placeholder={{ color: "whiteAlpha.800" }}
                />
                <InputRightElement w="64px" h="100%" rounded="sm">
                  <ButtonGroup
                    display="flex"
                    w="100%"
                    spacing={0}
                    colorScheme="gray"
                  >
                    <IconButton
                      type="submit"
                      flex={1}
                      size="sm"
                      onClick={() => {
                        editor.selection = lastKnownSelection;
                        insertLink(editor, link);
                        setEditingLink(false);
                        setLink("");
                      }}
                      icon={<Icon fontSize="xl" as={CgCheck} />}
                    />
                    <IconButton
                      flex={1}
                      size="sm"
                      fontSize="xs"
                      onClick={() => {
                        editor.selection = lastKnownSelection;
                        setLink("");
                        setEditingLink(false);
                      }}
                      icon={<Icon as={CgClose} />}
                    />
                  </ButtonGroup>
                </InputRightElement>
              </InputGroup>
            </form>
          </Box>
        )}
      </ButtonGroup>
    </Flex>
  );
};

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];

const Textarea = ({ size }) => {
  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ]);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const [editor] = useState(
    () => withLinks(withHistory(withReact(createEditor()))),
    []
  );

  return (
    <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
      <Box
        className={_styles.showOnFocusTrigger}
        position="relative"
        fontSize="sm"
        size={size}
        rounded="sm"
        borderWidth="2px"
        height={36}
        overflow="auto"
        transition="all var(--chakra-transition-duration-normal);"
        _hover={{ borderColor: "gray.300" }}
        _focusWithin={{
          boxShadow: "0 0 0 2px var(--chakra-colors-purple-300)!important",
          borderColor: "transparent",
        }}
      >
        <Toolbar className={_styles.toolbar} />
        <Box
          className={_styles.editable}
          as={Editable}
          width="100%"
          paddingInlineStart={3}
          paddingInlineEnd={3}
          paddingY={"8px"}
          overflow="auto"
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Description…"
          spellCheck={false}
          onKeyDown={(event) => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event)) {
                event.preventDefault();
                const mark = HOTKEYS[hotkey];
                toggleMark(editor, mark);
              }
            }
          }}
          _focusVisible={{
            boxShadow: "none !important",
          }}
        >
          {/* <Editable          
          /> */}
        </Box>
      </Box>
    </Slate>
  );
};

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      LIST_TYPES.includes(
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type
      ),
    split: true,
  });
  const newProperties = {
    type: isActive ? "paragraph" : isList ? "list-item" : format,
  };
  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  });

  return !!match;
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case "link":
      return (
        <Link color="blue.500" as={"a"} {...attributes} href={element.url}>
          {children}
        </Link>
      );
    case "bulleted-list":
      return <UnorderedList {...attributes}>{children}</UnorderedList>;
    case "heading-one":
      return (
        <Heading size="md" {...attributes}>
          {children}
        </Heading>
      );
    case "heading-two":
      return (
        <Heading size="sm" {...attributes}>
          {children}
        </Heading>
      );
    case "list-item":
      return <ListItem {...attributes}>{children}</ListItem>;
    case "numbered-list":
      return <OrderedList {...attributes}>{children}</OrderedList>;
    default:
      return <Text {...attributes}>{children}</Text>;
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const BlockButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <IconButton
      flex={1}
      {...(isBlockActive(editor, format) ? styles.variants.active : {})}
      _hover={{
        bg: isBlockActive(editor, format) ? "purple.400" : "gray.200",
      }}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
      icon={icon}
    />
  );
};

const MarkButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <IconButton
      flex={1}
      {...(isMarkActive(editor, format) ? styles.variants.active : {})}
      _hover={{
        bg: isMarkActive(editor, format) ? "purple.400" : "gray.200",
      }}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
      icon={icon}
    />
  );
};

const LinkButton = ({ onMouseDown }) => {
  const editor = useSlate();
  const active = isLinkActive(editor);
  return (
    <IconButton
      flex={1}
      {...(active ? styles.variants.active : {})}
      _hover={{
        bg: active ? "purple.400" : "gray.200",
      }}
      onMouseDown={onMouseDown}
      icon={<BsLink />}
    />
  );
};

export default Textarea;
