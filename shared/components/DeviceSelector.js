import {
  useRadio,
  useRadioGroup,
  Box,
  Tooltip,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { BsTablet, BsPhone } from "react-icons/bs";
import { IoIosDesktop } from "react-icons/io";

function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Tooltip label={props.value}>
      <Box as="label" h="100%">
        <input {...input} />
        <Flex
          {...checkbox}
          cursor="pointer"
          bg="gray.100"
          _checked={{
            bg: "secondary.300",
            color: "white",
          }}
          _focus={{
            boxShadow: "none",
          }}
          h="100%"
          alignItems="center"
          justifyContent="center"
          px={3}
          py={4}
        >
          {props.children}
        </Flex>
      </Box>
    </Tooltip>
  );
}

const iconMap = {
  phone: <Icon fontSize="sm" as={BsPhone} />,
  tablet: <Icon fontSize="md" as={BsTablet} />,
  desktop: <Icon fontSize="2xl" as={IoIosDesktop} />,
};

// Step 2: Use the `useRadioGroup` hook to control a group of custom radios.
const DeviceSelector = ({ value, onChange }) => {
  const options = ["phone", "tablet", "desktop"];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "device",
    value,
    onChange,
  });

  const group = getRootProps();

  return (
    <Flex h="32px" spacing={0} {...group} rounded="md" overflow="hidden">
      {options.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <RadioCard key={value} {...radio}>
            {iconMap[value]}
          </RadioCard>
        );
      })}
    </Flex>
  );
};

export default DeviceSelector;
