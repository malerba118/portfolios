import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  InputRightElement,
  InputGroup,
  Input,
  Button,
  Icon,
  Box,
} from "@chakra-ui/react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "client/utils/image";
import { observer } from "mobx-react";

const MediaEditorModal = observer(({ isOpen, media, onSave, onClose }) => {
  const initialRef = React.useRef();
  const finalRef = React.useRef();
  const [crop, setCrop] = useState(media.crop || { x: 0, y: 0 });
  const [zoom, setZoom] = useState(media.zoom || 1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState();

  return (
    <Modal
      isCentered
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
      size="3xl"
    >
      <ModalOverlay />
      <ModalContent>
        {/* <ModalHeader>Publish Changes</ModalHeader> */}
        <ModalBody p={0}>
          {media && (
            <Box
              w="100%"
              h="500px"
              pos="relative"
              background="#333"
              roundedTop="md"
              overflow="hidden"
            >
              <Cropper
                minZoom={1}
                mazXoom={3}
                image={media.rawUrl}
                crop={crop}
                aspect={
                  media.width && media.height
                    ? media.width / media.height
                    : 4 / 3
                }
                onCropChange={setCrop}
                zoom={zoom}
                onCropComplete={(croppedArea, croppedAreaPixels) => {
                  setCroppedAreaPixels(croppedAreaPixels);
                }}
                onZoomChange={setZoom}
                restrictPosition={false}
              />
            </Box>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="purple"
            mr={3}
            onClick={() => {
              getCroppedImg(media.rawUrl, croppedAreaPixels).then((file) =>
                onSave({ file, crop, zoom })
              );
            }}
          >
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});

export default MediaEditorModal;
