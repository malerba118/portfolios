import React from "react";
import { Flex, Tooltip, IconButton, Text } from "@chakra-ui/react";
import { IoMdTrash as RemoveIcon } from "react-icons/io";
import FileUploader from "./FileUploader";
import useStorageRef from "shared/hooks/useStorageRef";
import _styles from "./MediaForm.module.css";

const ResumeUploader = ({ resume, onChange, folder = "", ...otherProps }) => {
  const storageRef = useStorageRef();

  const handleFiles = async (files) => {
    const file = files[0];
    const fileRef = storageRef.current.child(folder + "resume-" + file.name);
    await fileRef.put(file);
    const url = await fileRef.getDownloadURL();
    onChange?.({
      name: file.name,
      url,
    });
  };

  return (
    <FileUploader
      {...otherProps}
      accept={[".pdf"]}
      onFiles={handleFiles}
      tooltip="Upload Resume"
    >
      {resume && (
        <Flex w="100%" align="center">
          <Text flex={1} px={1} isTruncated fontSize="sm" color="gray.700">
            {resume.name}
          </Text>
          <Tooltip label={"Remove"}>
            <IconButton
              onClick={(e) => {
                onChange?.(null);
                e.stopPropagation();
              }}
              size="sm"
              h="28px"
              icon={<RemoveIcon />}
            />
          </Tooltip>
        </Flex>
      )}
    </FileUploader>
  );
};

export default ResumeUploader;
