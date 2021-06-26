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
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import {
  IoIosCheckmarkCircleOutline as AvailableIcon,
  IoIosCloseCircleOutline as UnavailableIcon,
} from "react-icons/io";
import InputContainer from "./InputContainer";
import FormSection from "./FormSection";
import * as api from "client/api";
import { useDebounce } from "use-debounce";

function PublishModal({ isOpen, onSuccess, onClose }) {
  const initialRef = React.useRef();
  const finalRef = React.useRef();
  const [subdomain, setSubdomain] = useState();
  const [debouncedSubdomain] = useDebounce(subdomain, 1000);

  const query = useQuery({
    queryKey: ["subdomain-availability", debouncedSubdomain],
    queryFn: () => api.subdomains.isSubdomainAvailable(debouncedSubdomain),
    enabled: !!debouncedSubdomain,
  });

  const isSubdomainAvailable =
    subdomain === debouncedSubdomain &&
    !query.isFetching &&
    query.data?.available === true;

  return (
    <Modal
      isCentered
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Publish Changes</ModalHeader>
        <ModalBody>
          <FormSection>
            <InputContainer label="Choose a Subdomain">
              <InputGroup>
                <Input
                  value={subdomain}
                  onChange={(e) => setSubdomain(e.target.value)}
                  ref={initialRef}
                  placeholder="Subdomain"
                />
                {debouncedSubdomain && !query.isFetching && (
                  <InputRightElement>
                    {query.data?.available === true && (
                      <Icon
                        as={AvailableIcon}
                        fontSize={24}
                        color="purple.400"
                      />
                    )}
                    {query.data?.available === false && (
                      <Icon
                        as={UnavailableIcon}
                        fontSize={24}
                        color="red.400"
                      />
                    )}
                  </InputRightElement>
                )}
              </InputGroup>
            </InputContainer>
          </FormSection>
        </ModalBody>
        <ModalFooter>
          <Button
            isDisabled={!isSubdomainAvailable}
            colorScheme="purple"
            mr={3}
          >
            Publish
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default PublishModal;
