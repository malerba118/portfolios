import React, {
  createContext,
  useLayoutEffect,
  useRef,
  useState,
  forwardRef,
  useMemo,
  useContext,
} from "react";
import {
  Box as ChakraBox,
  useForceUpdate,
  useLatestRef,
} from "@chakra-ui/react";
import { useSpring } from "framer-motion";
import { useScroll, ScrollProvider } from "./ScrollProvider";
import { MotionBox } from "./chakra";
import { keyframes as animation } from "popmotion";
import flattenChildren from "react-keyed-flatten-children";
import throttle from "lodash.throttle";

const sum = (nums) => {
  return nums.reduce((a, b) => a + b, 0);
};

const getRect = (el) => ({
  x: el.offsetLeft,
  y: el.offsetTop,
  width: el.offsetWidth,
  height: el.offsetHeight,
});

const useSize = (ref, handler) => {
  const handlerRef = useLatestRef(handler);

  useLayoutEffect(() => {
    handlerRef.current(getRect(ref.current));
    const observer = new ResizeObserver(() => {
      handlerRef.current(getRect(ref.current));
    });
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [ref.current]);
};

const useParallaxApi = ({ ids }) => {
  const [containerRect, setContainerRect] = useState(null);
  const [pageRects, setPageRects] = useState({});

  const setPageRect = (pageId, rect) => {
    setPageRects((prev) => ({
      ...prev,
      [pageId]: rect,
    }));
  };

  const isReady = useMemo(() => {
    return ids.every((id) => pageRects[id] != null) && !!containerRect;
  }, [pageRects, containerRect, JSON.stringify(ids)]);

  const normalizedPageRects = useMemo(() => {
    if (!isReady) {
      return {};
    }
    const scrollWidth =
      sum(ids.map((id) => pageRects[id].width)) - containerRect.width;
    const scrollHeight =
      sum(ids.map((id) => pageRects[id].height)) - containerRect.height;
    const normalizeRect = (rect) => {
      if (!rect) {
        return null;
      }
      return {
        x: rect.x / scrollWidth,
        y: rect.y / scrollHeight,
        width: rect.width / scrollWidth,
        height: rect.height / scrollHeight,
      };
    };

    const obj = {};
    ids.forEach((id) => {
      obj[id] = normalizeRect(pageRects[id]);
    });
    return obj;
  }, [JSON.stringify(ids), pageRects, containerRect, isReady]);

  const normalizedContainerRect = useMemo(() => {
    if (!isReady) {
      return {};
    }
    const scrollWidth =
      sum(ids.map((id) => pageRects[id].width)) - containerRect.width;
    const scrollHeight =
      sum(ids.map((id) => pageRects[id].height)) - containerRect.height;
    const normalizeRect = (rect) => {
      if (!rect) {
        return null;
      }
      return {
        x: rect.x / scrollWidth,
        y: rect.y / scrollHeight,
        width: rect.width / scrollWidth,
        height: rect.height / scrollHeight,
      };
    };

    return normalizeRect(containerRect);
  }, [JSON.stringify(ids), pageRects, containerRect, isReady]);

  return {
    setContainerRect,
    setPageRect,
    pageRects,
    normalizedPageRects,
    containerRect,
    normalizedContainerRect,
    isReady,
  };
};

const ParallaxContext = createContext(null);

export const Parallax = ({ children, ...otherProps }) => {
  const containerRef = useRef(null);
  const flattenedChildren = flattenChildren(children);
  const ids = flattenedChildren.map((child) => child.props.pageId);

  const api = useParallaxApi({ ids });

  useSize(containerRef, (size) => {
    api.setContainerRect(size);
  });

  const handleResize = (pageId) => (size) => {
    api.setPageRect(pageId, size);
  };

  return (
    <ParallaxContext.Provider value={api}>
      <ScrollProvider.Box ref={containerRef} overflow="auto" {...otherProps}>
        <ChakraBox overflow="hidden">
          {flattenedChildren.map((child) => {
            if (child.type === Page) {
              return React.cloneElement(child, {
                onResize: handleResize(child.props.pageId),
              });
            }
          })}
        </ChakraBox>
      </ScrollProvider.Box>
    </ParallaxContext.Provider>
  );
};

const useParallax = () => {
  return useContext(ParallaxContext);
};

const getAnimationForProperty = (property, keyframes) => {
  if (!keyframes) {
    return null;
  }
  const values = [];
  const numericOffsets = [];
  const offsets = Object.keys(keyframes).sort((a, b) => Number(a) - Number(b));
  offsets.forEach((offset) => {
    const keyframe = keyframes[offset];
    if (property in keyframe) {
      const value = keyframe[property];
      const numericOffset = Number(offset);
      values.push(value);
      numericOffsets.push(numericOffset);
    }
  });
  if (!values.length) {
    return null;
  }
  const anim = animation({
    to: values.length === 1 ? values[0] : values,
    offset: offsets.length === 1 ? offsets[0] : offsets,
    duration: 1,
  });
  // const anim = animation({
  //   to: values,
  //   offset: offsets,
  //   duration: 1,
  // });
  return {
    get(progress) {
      return anim.next(progress).value;
    },
  };
};

const PageContext = createContext(null);

const usePage = () => {
  return useContext(PageContext);
};

export const Page = forwardRef(
  (
    {
      pageId,
      children,
      keyframes,
      onResize,
      onMount,
      onUnmount,
      ...otherProps
    },
    ref
  ) => {
    const boxRef = useRef(null);
    const parallax = useParallax();
    const forceUpdate = useForceUpdate();

    useSize(boxRef, (size) => {
      onResize(size);
    });

    return (
      <PageContext.Provider value={{ id: pageId }}>
        <Parallax.Box
          key={String(parallax.isReady)}
          visibility={parallax.isReady ? "visible" : "hidden"}
          keyframes={keyframes}
          ref={(el) => {
            boxRef.current = el;
            if (ref) {
              ref.current = el;
            }
            forceUpdate();
          }}
          pos="relative"
          {...otherProps}
        >
          {children}
        </Parallax.Box>
      </PageContext.Provider>
    );
  }
);

export const Box = forwardRef(({ keyframes, children, ...otherProps }, ref) => {
  const page = usePage();
  const parallax = useParallax();
  const scroll = useScroll();

  const animations = useMemo(() => {
    let evaledKeyframes = null;
    if (typeof keyframes === "function") {
      if (parallax.normalizedPageRects[page.id]) {
        evaledKeyframes = keyframes({
          page: parallax.normalizedPageRects[page.id],
          pages: parallax.normalizedPageRects,
          container: parallax.normalizedContainerRect,
        });
      }
    } else {
      evaledKeyframes = keyframes;
    }

    return {
      y: getAnimationForProperty("y", evaledKeyframes),
      x: getAnimationForProperty("x", evaledKeyframes),
      scale: getAnimationForProperty("scale", evaledKeyframes),
      skewX: getAnimationForProperty("skewX", evaledKeyframes),
      skewY: getAnimationForProperty("skewY", evaledKeyframes),
      rotate: getAnimationForProperty("rotate", evaledKeyframes),
      opacity: getAnimationForProperty("opacity", evaledKeyframes),
    };
  }, [parallax.normalizedPageRects, keyframes]);

  const springs = {
    x: useSpring(animations.x?.get(0) ?? "0", {
      mass: 0.1,
      damping: 20,
    }),
    y: useSpring(animations.y?.get(0) ?? "0", {
      mass: 0.1,
      damping: 20,
    }),
    scale: useSpring(animations.scale?.get(0) ?? "1", {
      restDelta: 0.000000001,
      restSpeed: 0.000000001,
      mass: 0.05,
      damping: 20,
    }),
    skewX: useSpring(animations.skewX?.get(0) ?? "0", {
      mass: 0.1,
      damping: 20,
    }),
    skewY: useSpring(animations.skewY?.get(0) ?? "0", {
      mass: 0.1,
      damping: 20,
    }),
    rotate: useSpring(animations.rotate?.get(0) ?? "0", {
      mass: 0.1,
      damping: 20,
    }),
    opacity: useSpring(animations.opacity?.get(0) ?? "1", {
      mass: 0.1,
      damping: 20,
    }),
  };

  useLayoutEffect(() => {
    const updateSprings = throttle(
      (progress) => {
        springs.x.set(animations.x?.get(progress) ?? "0");
        springs.y.set(animations.y?.get(progress) ?? "0");
        springs.scale.set(animations.scale?.get(progress) ?? "1");
        springs.skewX.set(animations.skewX?.get(progress) ?? "0");
        springs.skewY.set(animations.skewY?.get(progress) ?? "0");
        springs.rotate.set(animations.rotate?.get(progress) ?? "0");
        springs.opacity.set(animations.opacity?.get(progress) ?? "1");
      },
      90,
      { leading: true, trailing: true }
    );
    updateSprings(scroll.progress.position.y.get());
    return scroll.progress.position.y.onChange(updateSprings);
  }, [scroll.progress.position.y, animations]);

  return (
    <MotionBox
      ref={ref}
      {...otherProps}
      style={{
        ...otherProps.style,
        y: springs.y,
        x: springs.x,
        scale: springs.scale,
        skewX: springs.skewX,
        skewY: springs.skewY,
        rotate: springs.rotate,
        opacity: springs.opacity,
      }}
    >
      {children}
    </MotionBox>
  );
});

Parallax.Page = Page;
Parallax.Box = Box;

export default Parallax;
