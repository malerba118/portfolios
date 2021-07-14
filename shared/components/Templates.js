import { Box, Stack, Flex, Text } from "@chakra-ui/react";
import React from "react";
import Section from "./Section";
import FormSection from "./FormSection";

const Templates = () => {
  return (
    <Stack p={6} spacing={6}>
      <Section title="Templates">
        <Stack spacing={4}>
          <FormSection>
            <Stack spacing={2}>
              <Flex justify="space-between">
                <Text fontSize="sm" fontWeight={600}>
                  Venice
                </Text>
                <Text fontSize="sm" fontWeight={400}>
                  Version 1
                </Text>
              </Flex>
              <Box w="100%" h="200px" bg="gray.200" rounded="md" />
            </Stack>
          </FormSection>
          <FormSection>
            <Stack spacing={2}>
              <Flex justify="space-between">
                <Text fontSize="sm" fontWeight={600}>
                  Madrid
                </Text>
                <Text fontSize="sm" fontWeight={400}>
                  Version 2
                </Text>
              </Flex>
              <Box w="100%" h="200px" bg="gray.200" rounded="md" />
            </Stack>
          </FormSection>
        </Stack>
      </Section>
    </Stack>
  );
};

export default Templates;
