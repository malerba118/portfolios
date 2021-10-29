import React, { useState } from "react";
import NextLink from "next/link";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  InputLeftAddon,
  InputRightAddon,
  InputRightElement,
  InputGroup,
  Input,
  Button,
  Icon,
  Text,
  HStack,
  Tooltip,
  Box,
  Flex,
  useClipboard,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { RiExternalLinkLine } from "react-icons/ri";
import { MdContentCopy, MdEdit } from "react-icons/md";
import {
  IoIosCheckmarkCircleOutline as AvailableIcon,
  IoIosCloseCircleOutline as UnavailableIcon,
} from "react-icons/io";
import InputContainer from "./InputContainer";
import FormSection from "./FormSection";
import * as api from "client/api";
import { useDebounce } from "use-debounce";
import { getHostingUrl } from "shared/utils/url";
import { useAuth } from "client/useAuth";
import { observer } from "mobx-react";
import {
  hasSubscription,
  isValidSubdomain,
  templates,
} from "shared/utils/data";
import { useRouter } from "next/router";
import IconButton from "./IconButton";
import { borders } from "shared/utils/styles";

const PublishModal = observer(
  ({ defaultValue, isOpen, onSuccess, onClose, portfolio }) => {
    const router = useRouter();
    const initialRef = React.useRef();
    const finalRef = React.useRef();
    const [subdomain, setSubdomain] = useState(defaultValue);
    const [isEditing, setEditing] = useState(false);
    const [debouncedSubdomain] = useDebounce(subdomain, 1000);
    const user = useAuth();
    const queryClient = useQueryClient();
    const { hasCopied, onCopy } = useClipboard(
      getHostingUrl({
        subdomain: debouncedSubdomain,
      })
    );

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

    const hasSub = hasSubscription(user);
    const isUsingLockedTemplate = !!templates[portfolio?.draft?.template]
      ?.locked;

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
              <FormSection>
                <InputContainer label="Website URL">
                  <InputGroup>
                    <Input
                      value={getHostingUrl({ subdomain: debouncedSubdomain })}
                      fontSize="sm"
                    />
                    <InputRightAddon
                      bg="gray.100"
                      px={0}
                      fontSize="sm"
                      overflow="hidden"
                      children={
                        <HStack spacing={0} height="calc(100%)">
                          <IconButton
                            tooltip="Visit link"
                            icon={<RiExternalLinkLine />}
                            h="100%"
                            onClick={() => {
                              window.open(
                                getHostingUrl({
                                  subdomain: debouncedSubdomain,
                                }),
                                "_blank"
                              );
                            }}
                          />
                          <Box h="100%" w="1px" bg="gray.200" />
                          <IconButton
                            tooltip={
                              hasCopied ? "Copied!" : "Copy to clipboard"
                            }
                            icon={<MdContentCopy />}
                            h="100%"
                            onClick={(e) => {
                              e.preventDefault();
                              onCopy(e);
                            }}
                          />
                        </HStack>
                      }
                    />
                  </InputGroup>
                </InputContainer>
              </FormSection>
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
              {!hasSub && isUsingLockedTemplate && (
                <>
                  <Text color="red.400" mb={4} fontSize="sm">
                    In order to publish while using a locked template, you'll
                    first need to{" "}
                    <NextLink href="/pricing">
                      <Text
                        display="inline"
                        textDecoration="underline"
                        _hover={{
                          color: "primary.400",
                        }}
                        cursor="pointer"
                      >
                        upgrade
                      </Text>
                    </NextLink>
                    .
                  </Text>
                </>
              )}
              {(!defaultValue || isEditing) && (
                <InputContainer
                  label={
                    isEditing ? "Change your Subdomain" : "Choose a Subdomain"
                  }
                  info={
                    isEditing
                      ? "If you change your subdomain, your site will no longer be available at the former subdomain."
                      : ""
                  }
                >
                  <InputGroup>
                    <InputLeftAddon
                      fontSize="sm"
                      bg="gray.100"
                      px={2}
                      children="https://"
                    />
                    <Input
                      value={subdomain}
                      onChange={(e) => {
                        setSubdomain(e.target.value);
                      }}
                      ref={initialRef}
                      placeholder="subdomain"
                      fontSize="sm"
                    />
                    <InputRightAddon
                      bg="gray.100"
                      px={2}
                      fontSize="sm"
                      children=".vernos.us"
                    />
                    <InputRightElement px={2} mr={"76px"} bg="transparent">
                      {query.data?.available === true && (
                        <Icon
                          as={AvailableIcon}
                          fontSize={24}
                          color="secondary.400"
                        />
                      )}
                      {query.data?.available === false && (
                        <Tooltip
                          placement="top"
                          bgColor="red.400"
                          label={query.data?.message}
                        >
                          <span>
                            <Icon
                              as={UnavailableIcon}
                              fontSize={24}
                              color="red.400"
                            />
                          </span>
                        </Tooltip>
                      )}
                    </InputRightElement>
                  </InputGroup>
                </InputContainer>
              )}
              {defaultValue && !isEditing && (
                <InputContainer label="Changes will be published to">
                  {/* <Flex
                    alignItems="center"
                    px={4}
                    h="48px"
                    rounded="4px"
                    // bg="gray.100"
                    {...borders({
                      top: true,
                      right: true,
                      bottom: true,
                      left: true,
                    })}
                  >
                    <Text fontSize="sm">
                      {getHostingUrl({
                        subdomain: debouncedSubdomain,
                      })}
                    </Text>
                  </Flex> */}
                  <InputGroup>
                    <Input
                      value={getHostingUrl({
                        subdomain: debouncedSubdomain,
                      })}
                      ref={initialRef}
                      placeholder="subdomain"
                      fontSize="sm"
                    />
                    <InputRightAddon
                      bg="gray.100"
                      px={0}
                      fontSize="sm"
                      overflow="hidden"
                      children={
                        <HStack spacing={0} height="100%">
                          <IconButton
                            tooltip={"Edit"}
                            icon={<MdEdit />}
                            h="100%"
                            onClick={(e) => {
                              setEditing(true);
                            }}
                          />
                        </HStack>
                      }
                    />
                  </InputGroup>
                </InputContainer>
              )}
            </FormSection>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Cancel
            </Button>
            {!hasSub && isUsingLockedTemplate ? (
              <Button
                colorScheme="secondary"
                onClick={() => {
                  router.push("/pricing");
                }}
              >
                Upgrade
              </Button>
            ) : (
              <Button
                isDisabled={!isSubdomainAvailable}
                isLoading={mutations.publish.isLoading}
                colorScheme="secondary"
                onClick={() => {
                  mutations.publish.mutate(debouncedSubdomain, {
                    onSuccess: () => {
                      queryClient.invalidateQueries("portfolio");
                    },
                  });
                }}
              >
                Publish
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
);

export default PublishModal;
