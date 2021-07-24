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
  Text,
  Link,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "react-query";
import {
  IoIosCheckmarkCircleOutline as AvailableIcon,
  IoIosCloseCircleOutline as UnavailableIcon,
} from "react-icons/io";
import InputContainer from "./InputContainer";
import FormSection from "./FormSection";
import * as api from "client/api";
import { useDebounce } from "use-debounce";

function PublishModal({ defaultValue, isOpen, onSuccess, onClose }) {
  const initialRef = React.useRef();
  const finalRef = React.useRef();
  const [subdomain, setSubdomain] = useState(defaultValue);
  const [debouncedSubdomain] = useDebounce(subdomain, 1000);

  const query = useQuery({
    queryKey: ["subdomain-availability", debouncedSubdomain],
    queryFn: () => api.subdomains.isSubdomainAvailable(debouncedSubdomain),
    enabled: !!debouncedSubdomain,
  });

  const mutations = {
    publish: useMutation(api.portfolio.publish),
  };

  const isSubdomainAvailable =
    subdomain === debouncedSubdomain &&
    !query.isFetching &&
    query.data?.available === true;

  if (mutations.publish.isSuccess) {
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
          <ModalHeader>Congrats, your site is live!</ModalHeader>
          <ModalBody>
            <Text fontSize="md">
              Check it out at{" "}
              <Link
                target="_blank"
                href={`http://localhost:3001?subdomain=${debouncedSubdomain}`}
                color="purple.400"
              >
                {`http://localhost:3001?subdomain=${debouncedSubdomain}`}
              </Link>
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }

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
            isLoading={mutations.publish.isLoading}
            colorScheme="purple"
            mr={3}
            onClick={() => {
              mutations.publish.mutate(debouncedSubdomain);
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

export default PublishModal;
