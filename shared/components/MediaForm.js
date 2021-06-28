import React, { useEffect, useRef, useState } from "react";
import Embed from "./Embed";
import { isDev } from "shared/utils/runtime";
import { observer } from "mobx-react";
import firebaseClient from "client/firebase";
import * as styles from "../utils/styles";
import Dropzone from "react-dropzone";
import { nanoid } from "nanoid";
import { motion } from "framer-motion";
import { MdAdd } from "react-icons/md";
import * as models from "shared/services/models";
import { Wrap, Box, Center, Icon } from "@chakra-ui/react";

const MotionWrap = motion(Wrap);

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

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
    console.log(files);
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

  console.log(medias.items.map((m) => m.id));

  return (
    <MotionWrap variants={container} initial="hidden" animate="show">
      {medias.items.map((media) => (
        <MediaManager key={media.id} media={media} file={fileMap[media.id]} />
      ))}
      <FileUploader onFiles={handleFiles} />
    </MotionWrap>
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
            const fileRef = storageRef.current.child(media.id);
            await fileRef.put(file);
            const url = await fileRef.getDownloadURL();
            console.log(url);
            media.set({ url });
            onUploadComplete?.();
          } catch (err) {
            console.log(err);
            onUploadError?.(err);
          }
        };
        upload();
      }
    }, [file, media]);

    if (!media.url) {
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
        />
      );
    }

    return (
      <img
        src={media.url}
        style={{
          objectFit: "cover",
          width: "73px",
          height: "73px",
          borderRadius: ".25rem",
        }}
        // initial={{ opacity: 0 }}
        // animate={{ opacity: 1 }}
      />
    );
  }
);

export default MediaForm;
