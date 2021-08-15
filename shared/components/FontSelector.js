import { Box, Input, MenuItem, Portal, useMenu } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import * as fonts from "client/fonts";
// import styles from "./FontSelector.module.css";
import Select, { Option } from "./Select";

const loadFontOptions = async () => {
  const fontList = await fonts.list();
  return fontList.map((font) => ({
    value: font.family,
    label: font.family,
  }));
};

const FontSelector = ({ limit = 25 }) => {
  const query = useQuery("fonts", loadFontOptions);
  const [value, setValue] = useState();
  const [search, setSearch] = useState("");

  const results = query?.data
    ?.filter((option) =>
      option.label.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, limit);

  return (
    <Select
      closeOnSelect={false}
      label={value}
      value={value}
      onChange={setValue}
      header={({ isOpen }) => (
        <Search
          autoFocus={isOpen}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      )}
      size="sm"
      listProps={{
        width: 48,
      }}
    >
      {query.isLoading && <Box>Loading...</Box>}
      {results?.map((font) => (
        <Option key={font.label} value={font.value} label={font.label} />
      ))}
    </Select>
  );
};

const Search = ({ autoFocus, value, onChange }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [autoFocus]);

  return (
    <Input
      ref={inputRef}
      h={8}
      px={3}
      borderTop="none"
      borderLeft="none"
      borderRight="none"
      borderBottom="2px solid var(--chakra-colors-gray-200) !important"
      size="sm"
      variant="flushed"
      placeholder="Search fonts..."
      _focusVisible={{ boxShadow: "none !important" }}
      value={value}
      onChange={onChange}
    />
  );
};

export default FontSelector;
