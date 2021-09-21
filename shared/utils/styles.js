export const borders = ({
  top,
  bottom,
  left,
  right,
  color = "var(--chakra-colors-gray-200) !important",
  style = "2px solid",
  isSelected = false,
  canSelect = false,
}) => {
  const props = {};
  if (top) {
    props.borderTop = style;
  }
  if (bottom) {
    props.borderBottom = style;
  }
  if (left) {
    props.borderLeft = style;
  }
  if (right) {
    props.borderRight = style;
  }
  props.borderColor = color;
  if (canSelect) {
    props._hover = {
      borderColor: isSelected
        ? "var(--chakra-colors-secondary-300) !important"
        : "var(--chakra-colors-gray-300) !important",
    };
  }
  if (isSelected) {
    props.borderColor = "var(--chakra-colors-secondary-300) !important";
  }
  return props;
};

export const variants = {
  active: {
    bg: "secondary.300",
    color: "white",
  },
};

export const transitions = {
  spring: {
    normal: { type: "spring", damping: 50, stiffness: 500 },
  },
};

export const textures = {
  dots: {
    backgroundImage:
      'url("https://www.transparenttextures.com/patterns/worn-dots.png")',
    backgroundBlendMode: "overlay",
  },
  speckles: {
    backgroundImage:
      'url("https://www.transparenttextures.com/patterns/asfalt-dark.png")',
    backgroundBlendMode: "multiply",
    backgroundSize: "12%",
  },
};
