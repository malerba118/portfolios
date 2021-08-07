import React from "react";
import { Button, Menu, MenuItem, MenuList, MenuButton } from "@chakra-ui/react";
import { BiChevronDown } from "react-icons/bi";
import * as styles from "../utils/styles";

const Select = ({
  value,
  onChange,
  label,
  closeOnSelect,
  closeOnBlur,
  onClose,
  onClick,
  children,
  ...otherProps
}) => {
  const selected = React.Children.toArray(children).find(
    (o) => o.props.value === value
  );
  return (
    <Menu
      onClose={onClose}
      closeOnSelect={closeOnSelect}
      closeOnBlur={closeOnBlur}
    >
      <MenuButton
        bg="white"
        variant="outline"
        fontSize="xs"
        as={Button}
        rightIcon={<BiChevronDown />}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.();
        }}
        {...styles.borders({
          top: true,
          right: true,
          bottom: true,
          left: true,
        })}
        _hover={{
          borderColor: "var(--chakra-colors-gray-300) !important",
        }}
        _active={{
          borderColor: "var(--chakra-colors-purple-300) !important",
        }}
        {...otherProps}
      >
        {label || selected?.props.label}
      </MenuButton>
      <MenuList fontSize="sm" minWidth={24}>
        {React.Children.map(children, (child) => {
          if (child.type.displayName === "SelectOption") {
            return React.cloneElement(child, {
              onSelect: child.props.onSelect || onChange,
            });
          }
          return child;
        })}
      </MenuList>
    </Menu>
  );
};

export const Option = ({ value, label, onSelect }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    onSelect?.(value);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSelect?.(value);
    }
  };

  return (
    <MenuItem h={8} onClick={handleClick} onKeyPress={handleKeyPress}>
      {label}
    </MenuItem>
  );
};

Option.displayName = "SelectOption";

export default Select;
