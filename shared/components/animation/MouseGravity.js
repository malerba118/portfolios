import React, { useRef } from "react";
import { useTransform, useSpring } from "framer-motion";
import { useMouse } from "./MouseProvider";
import { MotionBox } from "./chakra";

const xDistanceTo = (xPosition, el) => {
  if (!el) return 0;
  const { x, width } = el.getBoundingClientRect();
  const xCenter = x + width / 2;
  return xPosition - xCenter;
};

const yDistanceTo = (yPosition, el) => {
  if (!el) return 0;
  const { y, height } = el.getBoundingClientRect();
  const yCenter = y + height / 2;
  return yPosition - yCenter;
};

const MouseGravity = ({
  as,
  children,
  amount = 25,
  maxDisplacement = 64,
  ...otherProps
}) => {
  const divisor = 500 / (amount + 1);
  const ref = useRef(null);
  const mouse = useMouse();
  const transformed = {
    x: useTransform(mouse.position.x, (val) =>
      Math.min(xDistanceTo(val, ref.current) / divisor, maxDisplacement)
    ),
    y: useTransform(mouse.position.y, (val) =>
      Math.min(yDistanceTo(val, ref.current) / divisor, maxDisplacement)
    ),
  };
  const springs = {
    x: useSpring(transformed.x, { mass: 0.25 }),
    y: useSpring(transformed.y, { mass: 0.25 }),
  };

  return (
    <MotionBox
      as={as}
      ref={ref}
      position="relative"
      style={{ x: springs.x, y: springs.y }}
      {...otherProps}
    >
      {children}
    </MotionBox>
  );
};

export default MouseGravity;
