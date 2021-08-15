import React from "react";
import {
  Box,
  Button,
  Menu,
  Flex,
  MenuList,
  MenuButton,
  Text,
} from "@chakra-ui/react";
import { BiChevronDown } from "react-icons/bi";
import * as styles from "../utils/styles";
import _styles from "./Select.module.css";

const Select = ({
  value,
  onChange,
  label,
  closeOnSelect,
  closeOnBlur,
  onClose,
  onClick,
  children,
  header,
  size = "sm",
  listProps,
  ...otherProps
}) => {
  const selected = React.Children.toArray(children).find(
    (o) => o.props.value === value
  );
  return (
    <Menu
      onClose={onClose}
      closeOnSelect={closeOnSelect}
      closeOnBlur={closeOnBlur}
      autoSelect={false}
    >
      {(args) => (
        <>
          <MenuButton
            className={_styles.menuButton}
            bg="white"
            variant="outline"
            as={Button}
            fontWeight="400"
            size={size}
            rightIcon={<BiChevronDown />}
            onClick={(e) => {
              e.stopPropagation();
              onClick?.();
            }}
            {...styles.borders({
              top: true,
              right: true,
              bottom: true,
              left: true,
            })}
            _hover={{
              borderColor: "var(--chakra-colors-gray-300) !important",
            }}
            _active={{
              borderColor: "var(--chakra-colors-purple-300) !important",
            }}
            {...otherProps}
          >
            <Text align="start" isTruncated>
              {label || selected?.props.label}
            </Text>
          </MenuButton>
          <MenuList
            pos="relative"
            fontSize="sm"
            minWidth={24}
            py={0}
            overflow="hidden"
            tabIndex={-1}
            {...styles.borders({
              top: true,
              left: true,
              right: true,
              bottom: true,
            })}
            {...listProps}
          >
            {header?.(args)}
            <Box maxHeight={36} overflow="auto">
              {React.Children.map(children, (child) => {
                if (child?.type?.displayName === "SelectOption") {
                  return React.cloneElement(child, {
                    onSelect: child.props.onSelect || onChange,
                  });
                }
                return child;
              })}
            </Box>
          </MenuList>
        </>
      )}
    </Menu>
  );
};

// export const Header = ({ children }) => {
//   return <Box onKeyPress={(e) => e.stopPropagation()}>{children}</Box>;
// };

// Header.displayName = "SelectHeader";

export const Option = ({ value, label, onSelect }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    onSelect?.(value);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSelect?.(value);
    }
  };

  return (
    <Flex
      align="center"
      h={8}
      px={3}
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      _focusVisible={{ boxShadow: "none !important" }}
      _hover={{
        bg: "gray.100",
      }}
      cursor="pointer"
    >
      <Text title={label} w="100%" isTruncated>
        {label}
      </Text>
    </Flex>
  );
};

Option.displayName = "SelectOption";

export default Select;
