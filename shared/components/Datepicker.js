import { Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Datepicker = ({ value, onChange }) => {
  const [date, setDate] = useState(null);
  useEffect(() => {
    console.log(date);
  }, [date]);
  return (
    <Input
      as={DatePicker}
      selected={date}
      onChange={(date) => setDate(date)}
      dateFormat="MM/yyyy"
      placeholderText="mm/yyyy"
      showMonthYearPicker
      size="sm"
    />
  );
};

export default Datepicker;
