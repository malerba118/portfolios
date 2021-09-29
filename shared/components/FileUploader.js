import React, { useEffect, useRef, useState } from "react";
import * as styles from "../utils/styles";
import Dropzone from "react-dropzone";
import { MdAdd } from "react-icons/md";
import { Box, Center, Icon, Tooltip, Text, useToast } from "@chakra-ui/react";

const FileUploader = ({
  children = <Icon as={MdAdd} color="gray.400" />,
  onFiles,
  onReject,
  accept,
  height,
  width,
  rounded = "md",
  tooltip = "Upload Files",
  allowMultiple = true,
}) => {
  const toast = useToast();

  const handleDrop = (files) => {
    onFiles(files);
  };

  const handleReject = () => {
    // This is an assumption, update in future if necessary
    toast({
      title: "File size exceeds limit, please keep files under 50MB",
      status: "error",
      duration: 3000,
    });
  };

  return (
    <Dropzone
      maxSize={1048576 * 50} // 50MB
      accept={accept}
      onDrop={handleDrop}
      onDropRejected={handleReject}
      multiple={allowMultiple}
    >
      {({ getRootProps, getInputProps }) => (
        <Box
          {...getRootProps()}
          h={height}
          w={width}
          minW={width}
          maxW={width}
          minH={height}
          maxH={height}
          rounded={rounded}
          position="relative"
          {...styles.borders({
            top: true,
            right: true,
            bottom: true,
            left: true,
          })}
          borderStyle="dashed"
        >
          <input
            {...getInputProps()}
            style={{
              width: "100%",
              height: "100%",
              opacity: 0,
              cursor: "pointer",
            }}
          />
          <Tooltip label={tooltip}>
            <Center pos="absolute" inset="0" cursor="pointer">
              {children}
            </Center>
          </Tooltip>
        </Box>
      )}
    </Dropzone>
  );
};

export default FileUploader;
