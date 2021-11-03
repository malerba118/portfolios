import React, { useState } from "react";
import {
  Flex,
  Tooltip,
  IconButton,
  Text,
  Spinner,
  Icon,
} from "@chakra-ui/react";
import { IoMdTrash as RemoveIcon } from "react-icons/io";
import { MdAdd } from "react-icons/md";
import FileUploader from "./FileUploader";
import useStorageRef from "shared/hooks/useStorageRef";
import _styles from "./MediaForm.module.css";

const ResumeUploader = ({ resume, onChange, folder = "", ...otherProps }) => {
  const storageRef = useStorageRef();
  const [status, setStatus] = useState("initial");

  const handleFiles = async (files) => {
    try {
      setStatus("pending");
      const file = files[0];
      const fileRef = storageRef.current.child(
        folder + "resume-" + file.name + "-" + Date.now()
      );
      await fileRef.put(file);
      const url = await fileRef.getDownloadURL();
      setStatus("success");
      onChange?.({
        name: file.name,
        url,
      });
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <FileUploader
      {...otherProps}
      accept={[".pdf"]}
      onFiles={handleFiles}
      tooltip={!resume ? "Upload Resume" : ""}
    >
      {status === "pending" && (
        <Spinner thickness="2px" size="sm" color="secondary.300" />
      )}
      {status === "error" && <Text>Failed to Upload</Text>}
      {(status === "success" || status === "initial") && !resume && (
        <Icon as={MdAdd} color="gray.400" />
      )}
      {(status === "success" || status === "initial") && resume && (
        <Flex w="100%" align="center">
          <Text flex={1} px={3} isTruncated fontSize="sm" color="gray.700">
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
