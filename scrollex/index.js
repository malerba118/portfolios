'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var framerMotion = require('framer-motion');
var nanoid = require('nanoid');
var popmotion = require('popmotion');
var throttle = require('lodash.throttle');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n["default"] = e;
    return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var throttle__default = /*#__PURE__*/_interopDefaultLegacy(throttle);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

const useScrollLayoutManager = ({ scrollAxis, }) => {
    let [container, setContainer] = React.useState({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    });
    let [sections, setSections] = React.useState({});
    const setContainerRect = React.useCallback((rect) => {
        setContainer(rect);
    }, [setContainer]);
    const setSectionRect = React.useCallback((sectionId, rect) => {
        setSections((prev) => (Object.assign(Object.assign({}, prev), { [sectionId]: rect })));
    }, [setSections]);
    const scrollMax = React.useMemo(() => {
        let total = 0;
        if (scrollAxis === 'y') {
            Object.values(sections).forEach((rect) => {
                total += rect.height;
            });
            total -= container.height;
        }
        else {
            Object.values(sections).forEach((rect) => {
                total += rect.width;
            });
            total -= container.width;
        }
        return total;
    }, [container, sections, scrollAxis]);
    return React.useMemo(() => ({
        layout: {
            sections,
            container,
            scrollMax,
        },
        setContainerRect,
        setSectionRect,
    }), [setContainerRect, setSectionRect, sections, container, scrollMax]);
};

/**
 * React hook to persist any value between renders,
 * but keeps it up-to-date if it changes.
 *
 * @param value the value or function to persist
 */
const useLatestRef = (value) => {
    const ref = React__namespace.useRef(null);
    ref.current = value;
    return ref;
};

const useResizeObserver = (ref, callback) => {
    const callbackRef = useLatestRef(callback);
    React.useEffect(() => {
        return ref.subscribe((el) => {
            if (el) {
                const observer = new ResizeObserver((entries) => {
                    callbackRef.current(entries[0]);
                });
                observer.observe(el);
                return () => {
                    observer.unobserve(el);
                    observer.disconnect();
                };
            }
            return;
        });
    }, [callbackRef, ref]);
};

class ObservableRef {
    constructor(defaultValue) {
        this.subscriptions = [];
        Object.defineProperty(this, 'current', {
            enumerable: true,
            get: () => {
                return this.value;
            },
            set: (nextVal) => {
                this.value = nextVal;
                this.notify(nextVal);
            },
        });
        this.current = defaultValue;
    }
    subscribe(subscriber) {
        this.subscriptions.push({
            subscriber,
            cleanup: subscriber(this.value),
        });
        return () => {
            this.subscriptions.forEach((subscription) => {
                var _a;
                if (subscription.subscriber === subscriber) {
                    (_a = subscription.cleanup) === null || _a === void 0 ? void 0 : _a.call(subscription);
                }
            });
            this.subscriptions = this.subscriptions.filter((subscription) => subscription.subscriber !== subscriber);
        };
    }
    notify(next) {
        this.subscriptions.forEach((subscription) => {
            var _a;
            (_a = subscription.cleanup) === null || _a === void 0 ? void 0 : _a.call(subscription);
            subscription.cleanup = subscription.subscriber(next);
        });
    }
}
const useObservableRef = (defaultValue) => {
    const [ref] = React.useState(() => new ObservableRef(defaultValue));
    return ref;
};

const ScrollContext = React.createContext(null);
const ScrollProvider = React.forwardRef((_a, ref) => {
    var { children, style } = _a, otherProps = __rest(_a, ["children", "style"]);
    const { scrollX, scrollY } = framerMotion.useElementScroll(ref);
    const velocityX = framerMotion.useVelocity(scrollX);
    const velocityY = framerMotion.useVelocity(scrollY);
    const scroll = React.useMemo(() => ({
        position: {
            x: scrollX,
            y: scrollY,
        },
        velocity: {
            x: velocityX,
            y: velocityY,
        },
    }), [scrollX, scrollY, velocityX, velocityY]);
    return (React__default["default"].createElement(ScrollContext.Provider, { value: scroll },
        React__default["default"].createElement("div", Object.assign({}, otherProps, { ref: ref, style: Object.assign({ scrollBehavior: 'smooth', overflow: 'auto' }, style) }), children)));
});
const useScroll = () => {
    const context = React.useContext(ScrollContext);
    if (context === null) {
        throw new Error('useScroll must be used inside of a ScrollProvider');
    }
    else {
        return context;
    }
};

const getRect = (el) => ({
    x: el.offsetLeft,
    y: el.offsetTop,
    width: el.offsetWidth,
    height: el.offsetHeight,
});
class LayoutSection {
    constructor(section, container) {
        this.x = section.x;
        this.y = section.y;
        this.width = section.width;
        this.height = section.height;
        this.container = container;
    }
    topAt(position) {
        if (position === 'container-top') {
            return this.y;
        }
        else if (position === 'container-center') {
            return this.y - this.container.height / 2;
        }
        else {
            return this.y - this.container.height;
        }
    }
    bottomAt(position) {
        if (position === 'container-top') {
            return this.y + this.height;
        }
        else if (position === 'container-center') {
            return this.y + this.height - this.container.height / 2;
        }
        else {
            return this.y + this.height - this.container.height;
        }
    }
    leftAt(position) {
        if (position === 'container-left') {
            return this.x;
        }
        else if (position === 'container-center') {
            return this.x - this.container.width / 2;
        }
        else {
            return this.x - this.container.width;
        }
    }
    rightAt(position) {
        if (position === 'container-left') {
            return this.x + this.width;
        }
        else if (position === 'container-center') {
            return this.x + this.width - this.container.width / 2;
        }
        else {
            return this.x + this.width - this.container.width;
        }
    }
}
class LayoutContainer {
    constructor(container) {
        this.x = container.x;
        this.y = container.y;
        this.width = container.width;
        this.height = container.height;
    }
}

const ScrollContainerContext = React.createContext(null);
const useScrollContainer = () => {
    return React.useContext(ScrollContainerContext);
};
const Container = (_a) => {
    var { scrollAxis = 'y', throttleAmount = 90, children } = _a, otherProps = __rest(_a, ["scrollAxis", "throttleAmount", "children"]);
    const containerRef = useObservableRef(null);
    const layoutManager = useScrollLayoutManager({ scrollAxis });
    useResizeObserver(containerRef, (entry) => {
        layoutManager.setContainerRect(getRect(entry.target));
    });
    const scrollContainerApi = React.useMemo(() => ({
        scrollAxis,
        layoutManager,
        throttleAmount,
    }), [scrollAxis, layoutManager, throttleAmount]);
    return (React__default["default"].createElement(ScrollContainerContext.Provider, { value: scrollContainerApi },
        React__default["default"].createElement(ScrollProvider, Object.assign({}, otherProps, { style: Object.assign({ position: 'relative', whiteSpace: 'nowrap', overflowX: scrollAxis === 'x' ? 'auto' : 'hidden', overflowY: scrollAxis === 'y' ? 'auto' : 'hidden' }, otherProps.style), ref: containerRef }), children)));
};

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".Section-module_heightFull__nfUym {\n  height: 100%;\n}\n\n.Section-module_widthFull__T-u3T {\n  width: 100%;\n}\n\n.Section-module_block__TWQV- {\n  display: block;\n}\n\n.Section-module_inlineBlock__Q099P {\n  display: inline-block;\n}\n";
var styles = {"heightFull":"Section-module_heightFull__nfUym","widthFull":"Section-module_widthFull__T-u3T","block":"Section-module_block__TWQV-","inlineBlock":"Section-module_inlineBlock__Q099P"};
styleInject(css_248z);

const SectionContext = React.createContext(null);
const useSection = () => {
    return React.useContext(SectionContext);
};
const Section = (_a) => {
    var { showOverflow = false, children, className } = _a, otherProps = __rest(_a, ["showOverflow", "children", "className"]);
    const sectionRef = useObservableRef(null);
    const [sectionId] = React.useState(() => nanoid.nanoid());
    const container = useScrollContainer();
    const section = useSection();
    if (section !== null) {
        throw new Error('Scroll.Section cannot be nested within another Scroll.Section');
    }
    if (container === null) {
        throw new Error('Scroll.Section can only be used within a Scroll.Container');
    }
    const { layoutManager, scrollAxis } = container;
    useResizeObserver(sectionRef, (entry) => {
        layoutManager.setSectionRect(sectionId, getRect(entry.target));
    });
    const isReady = !!layoutManager.layout.sections[sectionId] &&
        layoutManager.layout.container.width !== 0 &&
        layoutManager.layout.container.height !== 0;
    const context = React.useMemo(() => ({
        sectionId,
        isReady,
    }), [sectionId, isReady]);
    // Using classes here to keep specificity low so user can override
    const _className = React.useMemo(() => {
        const classes = [className];
        if (scrollAxis === 'x') {
            classes.push(styles.heightFull);
            classes.push(styles.inlineBlock);
        }
        else {
            classes.push(styles.widthFull);
            classes.push(styles.block);
        }
        return classes.join(' ');
    }, [scrollAxis, className]);
    return (React__default["default"].createElement(SectionContext.Provider, { value: context },
        React__default["default"].createElement(framerMotion.motion.div, Object.assign({}, otherProps, { ref: sectionRef, className: _className, style: Object.assign({ position: 'relative', visibility: isReady ? 'visible' : 'hidden', overflow: showOverflow ? 'visible' : 'hidden', whiteSpace: 'normal' }, otherProps.style) }), children)));
};

const getAnimationForProperty = (property, keyframesMap) => {
    const values = [];
    const offsets = [];
    for (const [offset, keyframe] of keyframesMap.entries()) {
        if (property in keyframe) {
            values.push(keyframe[property]);
            offsets.push(offset);
        }
    }
    if (!values.length) {
        return null;
    }
    let anim;
    if (values.length === 1) {
        // needs at least two values to work as expected
        anim = popmotion.keyframes({
            to: [values[0], values[0]],
            offset: [offsets[0], offsets[0] + 1],
            duration: 1,
        });
    }
    else {
        anim = popmotion.keyframes({
            to: values,
            offset: offsets,
            duration: 1,
        });
    }
    return {
        get(progress) {
            return anim.next(progress).value;
        },
    };
};
const getKeyframesContext = (layout, sectionId, data) => {
    const section = new LayoutSection(layout.sections[sectionId], layout.container);
    const container = new LayoutContainer(layout.container);
    const scrollMax = layout.scrollMax;
    return {
        section,
        container,
        scrollMax,
        data,
    };
};
const processKeyframes = (keyframes, layout, sectionId, data) => {
    let keyframesObj;
    if (typeof keyframes === 'function') {
        keyframesObj = keyframes(getKeyframesContext(layout, sectionId, data));
    }
    else {
        keyframesObj = keyframes;
    }
    const offsets = Object.keys(keyframesObj).sort((a, b) => Number(a) - Number(b));
    const map = new Map();
    offsets.forEach((offset) => {
        map.set(Number(offset) / layout.scrollMax, keyframesObj[offset]);
    });
    return map;
};
const DEFAULT_SPRING_CONFIGS = {
    translateX: {
        mass: 0.05,
        damping: 7.5,
        stiffness: 100,
    },
    translateY: {
        mass: 0.05,
        damping: 7.5,
        stiffness: 100,
    },
    translateZ: {
        mass: 0.05,
        damping: 7.5,
        stiffness: 100,
    },
    scale: {
        restDelta: 0.000000001,
        restSpeed: 0.000000001,
        mass: 0.05,
        damping: 20,
    },
    scaleX: {
        restDelta: 0.000000001,
        restSpeed: 0.000000001,
        mass: 0.05,
        damping: 20,
    },
    scaleY: {
        restDelta: 0.000000001,
        restSpeed: 0.000000001,
        mass: 0.05,
        damping: 20,
    },
    scaleZ: {
        restDelta: 0.000000001,
        restSpeed: 0.000000001,
        mass: 0.05,
        damping: 20,
    },
    skewX: {
        mass: 0.1,
        damping: 20,
    },
    skewY: {
        mass: 0.1,
        damping: 20,
    },
    rotateX: {
        mass: 0.05,
        damping: 7.5,
        stiffness: 100,
    },
    rotateY: {
        mass: 0.05,
        damping: 7.5,
        stiffness: 100,
    },
    rotateZ: {
        mass: 0.05,
        damping: 7.5,
        stiffness: 100,
    },
    opacity: {
        mass: 0.1,
        damping: 20,
    },
};
const Springs = ({ keyframes, springConfigs, data, onSprings }) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1;
    const container = useScrollContainer();
    const section = useSection();
    const scroll = useScroll();
    if (!section) {
        throw new Error('Springs can only be used inside of a Scroll.Section');
    }
    if (container === null) {
        throw new Error('Springs can only be used within a Scroll.Container');
    }
    const { layoutManager, scrollAxis, throttleAmount } = container;
    // section dependencies include section and container rects
    const animations = React.useMemo(() => {
        const keyframesMap = processKeyframes(keyframes, layoutManager.layout, section.sectionId, data);
        return {
            translateX: getAnimationForProperty('translateX', keyframesMap),
            translateY: getAnimationForProperty('translateY', keyframesMap),
            translateZ: getAnimationForProperty('translateZ', keyframesMap),
            scale: getAnimationForProperty('scale', keyframesMap),
            scaleX: getAnimationForProperty('scaleX', keyframesMap),
            scaleY: getAnimationForProperty('scaleY', keyframesMap),
            scaleZ: getAnimationForProperty('scaleZ', keyframesMap),
            skewX: getAnimationForProperty('skewX', keyframesMap),
            skewY: getAnimationForProperty('skewY', keyframesMap),
            rotateX: getAnimationForProperty('rotateX', keyframesMap),
            rotateY: getAnimationForProperty('rotateY', keyframesMap),
            rotateZ: getAnimationForProperty('rotateZ', keyframesMap),
            opacity: getAnimationForProperty('opacity', keyframesMap),
        };
    }, [layoutManager.layout, keyframes, JSON.stringify(data)]);
    const mergedSpringConfigs = Object.assign(Object.assign({}, DEFAULT_SPRING_CONFIGS), springConfigs);
    const springs = {
        translateX: framerMotion.useSpring((_b = (_a = animations.translateX) === null || _a === void 0 ? void 0 : _a.get(0)) !== null && _b !== void 0 ? _b : '0', mergedSpringConfigs.translateX),
        translateY: framerMotion.useSpring((_d = (_c = animations.translateY) === null || _c === void 0 ? void 0 : _c.get(0)) !== null && _d !== void 0 ? _d : '0', mergedSpringConfigs.translateY),
        translateZ: framerMotion.useSpring((_f = (_e = animations.translateZ) === null || _e === void 0 ? void 0 : _e.get(0)) !== null && _f !== void 0 ? _f : '0', mergedSpringConfigs.translateZ),
        scale: framerMotion.useSpring((_h = (_g = animations.scale) === null || _g === void 0 ? void 0 : _g.get(0)) !== null && _h !== void 0 ? _h : '1', mergedSpringConfigs.scale),
        scaleX: framerMotion.useSpring((_k = (_j = animations.scaleX) === null || _j === void 0 ? void 0 : _j.get(0)) !== null && _k !== void 0 ? _k : '1', mergedSpringConfigs.scaleX),
        scaleY: framerMotion.useSpring((_m = (_l = animations.scaleY) === null || _l === void 0 ? void 0 : _l.get(0)) !== null && _m !== void 0 ? _m : '1', mergedSpringConfigs.scaleY),
        scaleZ: framerMotion.useSpring((_p = (_o = animations.scaleZ) === null || _o === void 0 ? void 0 : _o.get(0)) !== null && _p !== void 0 ? _p : '1', mergedSpringConfigs.scaleZ),
        skewX: framerMotion.useSpring((_r = (_q = animations.skewX) === null || _q === void 0 ? void 0 : _q.get(0)) !== null && _r !== void 0 ? _r : '0', mergedSpringConfigs.skewX),
        skewY: framerMotion.useSpring((_t = (_s = animations.skewY) === null || _s === void 0 ? void 0 : _s.get(0)) !== null && _t !== void 0 ? _t : '0', mergedSpringConfigs.skewY),
        rotateX: framerMotion.useSpring((_v = (_u = animations.rotateX) === null || _u === void 0 ? void 0 : _u.get(0)) !== null && _v !== void 0 ? _v : '0', mergedSpringConfigs.rotateX),
        rotateY: framerMotion.useSpring((_x = (_w = animations.rotateY) === null || _w === void 0 ? void 0 : _w.get(0)) !== null && _x !== void 0 ? _x : '0', mergedSpringConfigs.rotateY),
        rotateZ: framerMotion.useSpring((_z = (_y = animations.rotateZ) === null || _y === void 0 ? void 0 : _y.get(0)) !== null && _z !== void 0 ? _z : '0', mergedSpringConfigs.rotateZ),
        opacity: framerMotion.useSpring((_1 = (_0 = animations.opacity) === null || _0 === void 0 ? void 0 : _0.get(0)) !== null && _1 !== void 0 ? _1 : '1', mergedSpringConfigs.opacity),
    };
    React.useEffect(() => {
        const updateSprings = throttle__default["default"]((scrollOffset) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1;
            const progress = scrollOffset / layoutManager.layout.scrollMax;
            springs.translateX.set((_b = (_a = animations.translateX) === null || _a === void 0 ? void 0 : _a.get(progress)) !== null && _b !== void 0 ? _b : '0');
            springs.translateY.set((_d = (_c = animations.translateY) === null || _c === void 0 ? void 0 : _c.get(progress)) !== null && _d !== void 0 ? _d : '0');
            springs.translateZ.set((_f = (_e = animations.translateZ) === null || _e === void 0 ? void 0 : _e.get(progress)) !== null && _f !== void 0 ? _f : '0');
            springs.scale.set((_h = (_g = animations.scale) === null || _g === void 0 ? void 0 : _g.get(progress)) !== null && _h !== void 0 ? _h : '1');
            springs.scaleX.set((_k = (_j = animations.scaleX) === null || _j === void 0 ? void 0 : _j.get(progress)) !== null && _k !== void 0 ? _k : '1');
            springs.scaleY.set((_m = (_l = animations.scaleY) === null || _l === void 0 ? void 0 : _l.get(progress)) !== null && _m !== void 0 ? _m : '1');
            springs.scaleZ.set((_p = (_o = animations.scaleZ) === null || _o === void 0 ? void 0 : _o.get(progress)) !== null && _p !== void 0 ? _p : '1');
            springs.skewX.set((_r = (_q = animations.skewX) === null || _q === void 0 ? void 0 : _q.get(progress)) !== null && _r !== void 0 ? _r : '0');
            springs.skewY.set((_t = (_s = animations.skewY) === null || _s === void 0 ? void 0 : _s.get(progress)) !== null && _t !== void 0 ? _t : '0');
            springs.rotateX.set((_v = (_u = animations.rotateX) === null || _u === void 0 ? void 0 : _u.get(progress)) !== null && _v !== void 0 ? _v : '0');
            springs.rotateY.set((_x = (_w = animations.rotateY) === null || _w === void 0 ? void 0 : _w.get(progress)) !== null && _x !== void 0 ? _x : '0');
            springs.rotateZ.set((_z = (_y = animations.rotateZ) === null || _y === void 0 ? void 0 : _y.get(progress)) !== null && _z !== void 0 ? _z : '0');
            springs.opacity.set((_1 = (_0 = animations.opacity) === null || _0 === void 0 ? void 0 : _0.get(progress)) !== null && _1 !== void 0 ? _1 : '1');
        }, throttleAmount, { leading: true, trailing: true });
        if (scrollAxis === 'y') {
            updateSprings(scroll.position.y.get());
            return scroll.position.y.onChange(updateSprings);
        }
        else {
            updateSprings(scroll.position.x.get());
            return scroll.position.x.onChange(updateSprings);
        }
    }, [
        scrollAxis,
        throttleAmount,
        scroll.position.y,
        scroll.position.x,
        animations,
        layoutManager.layout.scrollMax,
    ]);
    React.useEffect(() => {
        onSprings(springs);
    }, []);
    return null;
};
const Item = (_a) => {
    var { keyframes = {}, springs: springConfigs = {}, data } = _a, otherProps = __rest(_a, ["keyframes", "springs", "data"]);
    const [springs, setSprings] = React.useState({});
    const section = useSection();
    if (!section) {
        throw new Error('Scroll.Item can only be used within a Scroll.Section');
    }
    return (React__default["default"].createElement(React__default["default"].Fragment, null,
        section.isReady && (React__default["default"].createElement(Springs, { keyframes: keyframes, springConfigs: springConfigs, data: data, onSprings: setSprings })),
        React__default["default"].createElement(framerMotion.motion.div, Object.assign({}, otherProps, { style: Object.assign(Object.assign({}, otherProps.style), { translateX: springs.translateX, translateY: springs.translateY, translateZ: springs.translateZ, scale: springs.scale, scaleX: springs.scaleX, scaleY: springs.scaleY, scaleZ: springs.scaleZ, skewX: springs.skewX, skewY: springs.skewY, rotateX: springs.rotateX, rotateY: springs.rotateY, rotateZ: springs.rotateZ, opacity: springs.opacity }) }))));
};

const Scroll = {
    Container,
    Section,
    Item,
};

exports.Scroll = Scroll;
//# sourceMappingURL=index.js.map
