import React, { useEffect, useState } from "react";
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
  Flex,
} from "@chakra-ui/react";
// import Cropper from "react-easy-crop";
import { getCroppedImg } from "client/utils/image";
import { observer } from "mobx-react";
import Cropper from "react-image-crop";
import { nanoid } from "nanoid";
import "react-image-crop/dist/ReactCrop.css";

const MediaEditorModal = observer(({ isOpen, media, onSave, onClose }) => {
  const initialRef = React.useRef();
  const finalRef = React.useRef();
  const [crop, setCrop] = useState(
    media.crop || { unit: "%", x: 0, y: 0, width: 100, height: 100 }
  );
  const [zoom, setZoom] = useState(media.zoom || 1);
  // const [croppedAreaPixels, setCroppedAreaPixels] = useState();

  useEffect(() => {
    console.log(crop);
  }, [crop]);

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
            <Flex
              w="100%"
              h="500px"
              pos="relative"
              background="#141414"
              roundedTop="md"
              overflow="hidden"
              justify="center"
              align="center"
            >
              <Cropper
                src={media.rawUrl}
                crop={crop}
                onChange={(crop, percentCrop) => setCrop(percentCrop)}
                // onCropComplete={(crop, croppedAreaPixels) => {
                //   setCroppedAreaPixels(croppedAreaPixels);
                // }}
                style={{ width: media.aspect * 500 }}
              />
            </Flex>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="purple"
            mr={3}
            onClick={() => {
              getCroppedImg(media.rawUrl, crop).then((file) =>
                onSave({ file, crop, zoom: 1 })
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
