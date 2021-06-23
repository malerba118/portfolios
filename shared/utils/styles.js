export const borders = ({
  top,
  bottom,
  left,
  right,
  color = "gray.200",
  style = "2px solid",
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

  return props;
};
