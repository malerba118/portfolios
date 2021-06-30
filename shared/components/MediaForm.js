import React, { useEffect, useRef, useState } from "react";
import Embed from "./Embed";
import { isDev } from "shared/utils/runtime";
import { observer } from "mobx-react";
import firebaseClient from "client/firebase";
import * as styles from "../utils/styles";
import Dropzone from "react-dropzone";
import { nanoid } from "nanoid";
import { MdAdd, MdEdit, MdRemove } from "react-icons/md";
import {
  Wrap,
  Box,
  Center,
  Icon,
  Spinner,
  Flex,
  Tooltip,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useAuth } from "client/useAuth";
import Img from "./Img";
import ReorderableList from "./ReorderableList";
import compress from "browser-image-compression";
import MediaEditorModal from "./MediaEditorModal";

const THUMBNAIL_SIZE = "80px";

const options = {
  maxSizeMB: 0.5,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
};

const useStorageRef = () => {
  const storageRef = useRef();

  useEffect(() => {
    storageRef.current = firebaseClient.storage().ref();
  }, []);

  return storageRef;
};

const processFile = async (file) => {
  return compress(file, options).catch((err) => {
    console.log("compression error", err);
    return Promise.resolve(file);
  });
};

const FileUploader = ({ onFiles, accept }) => {
  const handleDrop = (files) => {
    onFiles(files);
  };

  return (
    <Dropzone accept={accept} onDrop={handleDrop}>
      {({ getRootProps, getInputProps }) => (
        <Box
          {...getRootProps()}
          h={THUMBNAIL_SIZE}
          w={THUMBNAIL_SIZE}
          rounded="md"
          position="relative"
          {...styles.borders({
            top: true,
            right: true,
            bottom: true,
            left: true,
          })}
        >
          <input
            {...getInputProps()}
            style={{
              width: 78,
              height: 78,
              opacity: 0,
              cursor: "pointer",
            }}
          />
          <Tooltip label="Upload Files">
            <Center pos="absolute" inset="0" cursor="pointer">
              <Icon as={MdAdd} color="gray.400" />
            </Center>
          </Tooltip>
        </Box>
      )}
    </Dropzone>
  );
};

const MediaForm = observer(({ medias, accept }) => {
  const [fileMap, setFileMap] = useState({});
  const [editing, setEditing] = useState(null);
  const user = useAuth();

  const setFile = (mediaId, file) => {
    setFileMap((prev) => ({
      ...prev,
      [mediaId]: file,
    }));
  };

  const handleFiles = (files) => {
    const map = {};
    const newMedias = [];
    files.forEach((file) => {
      const id = nanoid();
      newMedias.push({
        id,
        url: null,
      });
      map[id] = file;
    });
    medias.add(newMedias);
    setFileMap(map);
  };

  return (
    <Flex w="100%" overflowX="auto" overflowY="hidden">
      <ReorderableList
        items={medias.items.slice()}
        onChange={(items) => medias.set({ items })}
      >
        {(media) => (
          <MediaManager
            key={media.id}
            media={media}
            file={fileMap[media.id]}
            folder={`users/${user?.uid}/public/`}
            onEdit={() => setEditing(media)}
            onDelete={() => medias.remove(media.id)}
          />
        )}
      </ReorderableList>
      <FileUploader accept={accept} onFiles={handleFiles} />
      <MediaEditorModal
        key={editing?.id}
        isOpen={!!editing}
        media={editing}
        onSave={(file) => {
          setFile(editing?.id, file);
        }}
        onClose={() => setEditing(null)}
      />
    </Flex>
  );
});

/**
 * Responsible for thumbnail previews and file uploading to firebase storage
 */
const MediaManager = observer(
  ({
    media,
    file,
    onEdit,
    onDelete,
    onUploadComplete,
    onUploadError,
    folder = "",
  }) => {
    const [loading, setLoading] = useState(false);
    const [hovered, setHovered] = useState(false);
    const storageRef = useStorageRef();

    useEffect(() => {
      if (file?.name && media?.id) {
        console.log(file, media.id);
        const upload = async () => {
          try {
            setLoading(true);
            const proccesedFile = await processFile(file);
            const fileRef = storageRef.current.child(folder + media.id);
            await fileRef.put(proccesedFile);
            const url = await fileRef.getDownloadURL();
            media.set({ url });
            onUploadComplete?.();
          } catch (err) {
            onUploadError?.(err);
          } finally {
            setLoading(false);
          }
        };
        upload();
      }
    }, [file, media?.id]);

    if (loading) {
      return (
        <Box
          h={THUMBNAIL_SIZE}
          w={THUMBNAIL_SIZE}
          rounded="md"
          {...styles.borders({
            top: true,
            right: true,
            bottom: true,
            left: true,
          })}
        >
          <Center h="100%" w="100%">
            <Spinner size="xs" color="gray.200" />
          </Center>
        </Box>
      );
    }

    return (
      <Box
        position="relative"
        w={THUMBNAIL_SIZE}
        h={THUMBNAIL_SIZE}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Img
          src={media.url}
          imgStyle={{
            objectFit: "cover",
            width: THUMBNAIL_SIZE,
            height: THUMBNAIL_SIZE,
            borderRadius: ".25rem",
          }}
          w={THUMBNAIL_SIZE}
          h={THUMBNAIL_SIZE}
          rounded="md"
        />
        {/* <Box
          display={hovered ? "block" : "none"}
          position="absolute"
          inset={0}
          overflow="hidden"
          bg="blackAlpha.600"
          rounded="md"
        >
          <Center w="100%" h="100%">
            <Tooltip label={"Edit"}>
              <IconButton
                size="xs"
                rounded="md"
                variant="solid"
                colorScheme="whiteAlpha"
                color="white"
                icon={<MdEdit />}
                onClick={() => onEdit?.()}
              />
            </Tooltip>
          </Center>
        </Box> */}
        <Box
          display={hovered ? "block" : "none"}
          position="absolute"
          top="-1px"
          right="0px"
          borderBottomStartRadius={3}
          borderTopEndRadius={5}
          overflow="hidden"
        >
          <Tooltip label={"Edit"}>
            <IconButton
              size="xs"
              variant="solid"
              icon={<MdEdit />}
              onClick={() => onEdit?.()}
            />
          </Tooltip>
          <Tooltip label={"Remove"}>
            <IconButton
              size="xs"
              variant="solid"
              icon={<MdRemove />}
              onClick={() => onDelete?.()}
            />
          </Tooltip>
        </Box>
      </Box>
    );
  }
);

export default MediaForm;
