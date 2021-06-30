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

function MediaEditorModal({ isOpen, media, onSave, onClose }) {
  const initialRef = React.useRef();
  const finalRef = React.useRef();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState();

  return (
    <Modal
      isCentered
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
    >
      <ModalOverlay />
      <ModalContent>
        {/* <ModalHeader>Publish Changes</ModalHeader> */}
        <ModalBody p={0}>
          {media && (
            <Box
              w="100%"
              h="400px"
              pos="relative"
              background="#333"
              roundedTop="md"
              overflow="hidden"
            >
              <Cropper
                image={media.url}
                crop={crop}
                zoom={1}
                aspect={4 / 3}
                onCropChange={setCrop}
                zoom={zoom}
                onCropComplete={(croppedArea, croppedAreaPixels) => {
                  setCroppedAreaPixels(croppedAreaPixels);
                }}
                onZoomChange={setZoom}
              />
            </Box>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="purple"
            mr={3}
            onClick={() => {
              getCroppedImg(media.url, croppedAreaPixels)
                .then(onSave)
                .catch((e) => console.log(e.message));
            }}
          >
            Publish
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default MediaEditorModal;
