import { Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Datepicker = ({ value, onChange }) => {
  return (
    <Input
      as={DatePicker}
      selected={value}
      onChange={(date) => onChange(date)}
      dateFormat="MM/yyyy"
      placeholderText="mm/yyyy"
      showMonthYearPicker
      size="sm"
    />
  );
};

export default Datepicker;
