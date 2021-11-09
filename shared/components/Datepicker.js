import { Input, Text, Checkbox, Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { borders } from "shared/utils/styles";

const Datepicker = ({ value, onChange, allowPresent = false }) => {
  return (
    <Input
      as={DatePicker}
      key={String(value === "present")}
      selected={value === "present" ? null : value}
      onChange={(date) => onChange(date)}
      dateFormat="MM/yyyy"
      placeholderText="mm/yyyy"
      showMonthYearPicker
      size="sm"
      children={
        allowPresent && (
          <Box
            style={{ clear: "both", float: "left" }}
            w="100%"
            py={1}
            {...borders({ top: true })}
          >
            <Checkbox
              pos="relative"
              left="50%"
              transform="translateX(-50%)"
              isChecked={value === "present"}
              onChange={(e) => {
                e.preventDefault();
                e.stopPropagation();
                e.target.checked ? onChange("present") : onChange(null);
              }}
              colorScheme="secondary"
            >
              <Text fontSize="sm">Present</Text>
            </Checkbox>
          </Box>
        )
      }
      // showTimeInput
      // timeInputLabel="Present"
      // customTimeInput={
      //   <Box>
      //     <Checkbox
      //       pos="relative"
      //       left="50%"
      //       transform="translateX(-50%)"
      //       isChecked={value === "now"}
      //       onChange={(e) => {
      //         e.preventDefault();
      //         e.stopPropagation();
      //       }}
      //     ></Checkbox>
      //   </Box>
      // }
    />
  );
};

export default Datepicker;
