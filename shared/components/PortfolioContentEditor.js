import React, { useState } from "react";
import {
  Heading,
  Stack,
  Flex,
  Box,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { MdEdit, MdDelete, MdAdd } from "react-icons/md";
import FormSection from "./FormSection";
import AboutForm from "./AboutForm";
import ProjectsForm from "./ProjectsForm";
import * as styles from "../utils/styles";
import Section from "./Section";

// const Section = ({ title, tooltips, children, canAdd = false, onAdd }) => {
//   return (
//     <>
//       <Box>
//         <Stack>
//           <Flex justify="space-between" align="flex-end">
//             <Heading size="md">{title}</Heading>
//             {canAdd && (
//               <Tooltip label={tooltips?.add}>
//                 <IconButton
//                   size="sm"
//                   rounded="4px"
//                   icon={<MdAdd />}
//                   onClick={() => onAdd?.()}
//                 />
//               </Tooltip>
//             )}
//           </Flex>
//           <Box>{children}</Box>
//         </Stack>
//       </Box>
//       {/* <Box h="2px" bg="gray.200" /> */}
//     </>
//   );
// };

const PortfolioContentEditor = ({ width, height, portfolio }) => {
  return (
    <Stack p={6} spacing={6}>
      <Section title="About">
        <AboutForm about={portfolio.content.about} />
      </Section>
      <Section
        title="Projects"
        canAdd
        onAdd={() => portfolio.content.addProject()}
        tooltips={{
          add: "Add Project",
        }}
      >
        <ProjectsForm
          projects={portfolio.content.projects}
          onDelete={(id) => portfolio.content.removeProject(id)}
        />
      </Section>
      <Section title="Work">
        <FormSection canDelete />
      </Section>
    </Stack>
  );
};

export default PortfolioContentEditor;
