import React, { useEffect, useRef, useState } from "react";
import Embed from "./Embed";
import { isLocal } from "shared/utils/runtime";
import { observer } from "mobx-react";
import firebaseClient from "client/firebase";
import * as styles from "../utils/styles";
import { nanoid } from "nanoid";
import { IoMdTrash as RemoveIcon } from "react-icons/io";
import { MdAdd, MdEdit, MdRemove } from "react-icons/md";
import {
  Box,
  Center,
  Spinner,
  Flex,
  Tooltip,
  IconButton,
} from "@chakra-ui/react";
import { useAuth } from "client/useAuth";
import Img from "./Img";
import ReorderableList from "./ReorderableList";
// import compress from "browser-image-compression";
import heic2any from "heic2any";
import MediaEditorModal from "./MediaEditorModal";
import FileUploader from "./FileUploader";
import useStorageRef from "shared/hooks/useStorageRef";
import _styles from "./MediaForm.module.css";

const getFileDimensions = (file) =>
  new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      resolve({
        height: img.height,
        width: img.width,
      });
      URL.revokeObjectURL(img.src);
    };
    img.src = url;
  });

const THUMBNAIL_SIZE = "80px";

const options = {
  maxSizeMB: 0.5,
  maxWidthOrHeight: 4200,
  useWebWorker: true,
  initialQuality: 10,
  maxIteration: 4,
};

const processFile = async (file) => {
  if (file.type === "image/gif") {
    return file;
  }
  if (file.type === "image/heic") {
    file = await heic2any({ blob: file, toType: "image/jpeg" });
  }
  return imageCompression(file, options).catch((err) => {
    console.log("compression error", err);
    return Promise.resolve(file);
  });
};

const MediaForm = observer(({ medias, accept, allowMultiple = true }) => {
  const [fileMap, setFileMap] = useState({});
  const user = useAuth();

  const handleFiles = (files) => {
    const map = {};
    const newMedias = [];
    files.forEach((file) => {
      const id = nanoid();
      newMedias.push({
        id,
        name: file.name,
        rawUrl: null,
        processedUrl: null,
        crop: null,
        zoom: null,
      });
      map[id] = file;
    });
    medias.add(newMedias);
    setFileMap(map);
  };

  return (
    <Flex w="100%" overflowX="auto" overflowY="hidden">
      <ReorderableList
        isDisabled={!allowMultiple}
        items={medias.items.slice()}
        onChange={(items) => medias.set({ items })}
        getItemStyle={(isDragging) => ({
          marginRight: 8,
        })}
      >
        {(media) => (
          <MediaManager
            key={media.id}
            media={media}
            file={fileMap[media.id]}
            folder={`users/${user?.id}/public/`}
            onDelete={() => medias.remove(media.id)}
          />
        )}
      </ReorderableList>
      {(allowMultiple || medias.items.length < 1) && (
        <FileUploader
          height={THUMBNAIL_SIZE}
          width={THUMBNAIL_SIZE}
          accept={accept}
          onFiles={handleFiles}
          tooltip="Upload Photos"
          allowMultiple={allowMultiple}
        />
      )}
    </Flex>
  );
});

/**
 * Responsible for thumbnail previews and file uploading to firebase storage
 */
const MediaManager = observer(
  ({ media, file, onDelete, onUploadComplete, onUploadError, folder = "" }) => {
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);
    const storageRef = useStorageRef();

    useEffect(() => {
      if (file && media) {
        const upload = async () => {
          try {
            setLoading(true);
            const proccesedFile = await processFile(file);
            const dimensions = await getFileDimensions(proccesedFile);
            const fileRef = storageRef.current.child(
              folder + "raw-" + media.id
            );
            await fileRef.put(proccesedFile);
            const url = await fileRef.getDownloadURL();
            media.set({ rawUrl: url, type: file.type, ...dimensions });
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

    const uploadProcessed = async ({ file, crop, zoom }) => {
      try {
        setLoading(true);
        const proccesedFile = await processFile(file);
        const fileRef = storageRef.current.child(
          folder + "processed-" + media.id
        );
        await fileRef.put(proccesedFile);
        const url = await fileRef.getDownloadURL();
        media.set({ processedUrl: url, crop, zoom });
        onUploadComplete?.();
      } catch (err) {
        console.log(err);
        onUploadError?.(err);
      } finally {
        setLoading(false);
      }
    };

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
        className={_styles.showOnHoverTrigger}
      >
        <Img
          src={media.processedUrl || media.rawUrl}
          imgStyle={{
            objectFit: "cover",
            width: THUMBNAIL_SIZE,
            height: THUMBNAIL_SIZE,
            borderRadius: ".25rem",
          }}
          w={THUMBNAIL_SIZE}
          h={THUMBNAIL_SIZE}
          rounded="md"
          overflow="hidden"
          alt={media.name}
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
          className={_styles.showOnHover}
          position="absolute"
          top="-1px"
          right="0px"
          borderBottomStartRadius={3}
          borderTopEndRadius={5}
          overflow="hidden"
        >
          {media.type !== "image/gif" && (
            <Tooltip label={"Edit"}>
              <IconButton
                size="xs"
                variant="solid"
                icon={<MdEdit />}
                onClick={() => setEditing(true)}
              />
            </Tooltip>
          )}
          <Tooltip label={"Delete"}>
            <IconButton
              size="xs"
              variant="solid"
              icon={<RemoveIcon />}
              color="orange.500"
              onClick={() => onDelete?.()}
            />
          </Tooltip>
          <MediaEditorModal
            isOpen={editing}
            media={media}
            onSave={({ file, crop, zoom }) => {
              uploadProcessed({ file, crop, zoom }).then(() => {
                setEditing(false);
              });
            }}
            onClose={() => setEditing(false)}
          />
        </Box>
      </Box>
    );
  }
);

export default MediaForm;
