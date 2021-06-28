import React, { useEffect, useRef, useState } from "react";
import Embed from "./Embed";
import { isDev } from "shared/utils/runtime";
import { observer } from "mobx-react";
import firebaseClient from "client/firebase";
import * as styles from "../utils/styles";
import Dropzone from "react-dropzone";
import { nanoid } from "nanoid";
import { MdAdd } from "react-icons/md";
import { Wrap, Box, Center, Icon, Spinner } from "@chakra-ui/react";
import Img from "./Img";

const useStorageRef = () => {
  const storageRef = useRef();

  useEffect(() => {
    storageRef.current = firebaseClient.storage().ref();
  }, []);

  return storageRef;
};

const FileUploader = ({ onFiles }) => {
  return (
    <Dropzone onDrop={onFiles}>
      {({ getRootProps, getInputProps }) => (
        <Box
          cursor="pointer"
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
          <Center h="100%" w="100%" {...getRootProps()}>
            <input {...getInputProps()} />
            <Icon as={MdAdd} color="gray.400" />
          </Center>
        </Box>
      )}
    </Dropzone>
  );
};

const MediaForm = observer(({ medias }) => {
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
    <Wrap>
      {medias.items.map((media) => (
        <MediaManager key={media.id} media={media} file={fileMap[media.id]} />
      ))}
      <FileUploader onFiles={handleFiles} />
    </Wrap>
  );
});

const MediaManager = observer(
  ({ media, file, onDelete, onUploadComplete, onUploadError }) => {
    const [loading, setLoading] = useState(false);
    const storageRef = useStorageRef();

    useEffect(() => {
      if (file && media) {
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
    }, [file, media]);

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
        rounded="md"
      />
    );
  }
);

export default MediaForm;
