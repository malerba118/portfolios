import React, { useEffect, useRef, useState } from "react";
import Embed from "./Embed";
import { isDev } from "shared/utils/runtime";
import { observer } from "mobx-react";
import firebaseClient from "client/firebase";
import * as styles from "../utils/styles";
import Dropzone from "react-dropzone";
import { nanoid } from "nanoid";
import { MdAdd } from "react-icons/md";
import {
  Wrap,
  Box,
  Center,
  Icon,
  Spinner,
  Flex,
  Tooltip,
} from "@chakra-ui/react";
import Img from "./Img";
import ReorderableList from "./ReorderableList";
import compress from "browser-image-compression";

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

const processFiles = async (files) => {
  return Promise.all(
    files.map((file) => {
      return compress(file, options).catch((err) => {
        console.log("compression error", err);
        return Promise.resolve(file);
      });
    })
  );
};

const FileUploader = ({ onFiles, accept }) => {
  const handleDrop = (files) => {
    processFiles(files).then(onFiles);
  };

  return (
    <Dropzone accept={accept} onDrop={handleDrop}>
      {({ getRootProps, getInputProps }) => (
        <Box
          {...getRootProps()}
          h="73px"
          w="73px"
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
            style={{ width: 71, height: 71, opacity: 0, cursor: "pointer" }}
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
    <Flex w="100%" overflowX="auto">
      {/* {medias.items.map((media) => (
        <MediaManager key={media.id} media={media} file={fileMap[media.id]} />
      ))} */}
      <ReorderableList
        items={medias.items.slice()}
        onChange={(items) => medias.set({ items })}
      >
        {(media) => (
          <MediaManager key={media.id} media={media} file={fileMap[media.id]} />
        )}
      </ReorderableList>
      <FileUploader accept={accept} onFiles={handleFiles} />
    </Flex>
  );
});

const MediaManager = observer(
  ({ media, file, onDelete, onUploadComplete, onUploadError }) => {
    const [loading, setLoading] = useState(false);
    const storageRef = useStorageRef();

    useEffect(() => {
      if (file?.name && media?.id) {
        console.log(file, media.id);
        const upload = async () => {
          try {
            setLoading(true);
            const fileRef = storageRef.current.child(media.id);
            await fileRef.put(file);
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

    if (!media.url || loading) {
      return (
        <Box
          h="73px"
          w="73px"
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
      <Img
        src={media.url}
        imgStyle={{
          objectFit: "cover",
          width: "73px",
          height: "73px",
          borderRadius: ".25rem",
        }}
        w="73px"
        h="73px"
        rounded="md"
      />
    );
  }
);

export default MediaForm;
