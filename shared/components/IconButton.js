import React, { forwardRef } from "react";
import {
  IconButton as ChakraIconButton,
  IconButtonProps as ChakraIconButtonProps,
  Tooltip as ChakraTooltip,
  TooltipProps as ChakraTooltipProps,
} from "@chakra-ui/react";

const IconButton = forwardRef((props, ref) => {
  const { tooltip, ...otherProps } = props;

  if (tooltip) {
    return (
      <ChakraTooltip label={tooltip}>
        <ChakraIconButton aria-label={tooltip} {...otherProps} />
      </ChakraTooltip>
    );
  }
  return <ChakraIconButton {...otherProps} />;
});

export default IconButton;
