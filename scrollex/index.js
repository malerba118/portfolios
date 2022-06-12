'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var framerMotion = require('framer-motion');

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
    const maxScrollPosition = React.useMemo(() => {
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
            maxScrollPosition,
        },
        setContainerRect,
        setSectionRect,
    }), [setContainerRect, setSectionRect, sections, container, maxScrollPosition]);
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

/**
 * Creates a constant value over the lifecycle of a component.
 *
 * Even if `useMemo` is provided an empty array as its final argument, it doesn't offer
 * a guarantee that it won't re-run for performance reasons later on. By using `useConst`
 * you can ensure that initializers don't execute twice or more.
 */
function useConst(init) {
    // Use useRef to store the value because it's the least expensive built-in
    // hook that works here. We could also use `useState` but that's more
    // expensive internally due to reducer handling which we don't need.
    const ref = React.useRef(null);
    if (ref.current === null) {
        ref.current = typeof init === 'function' ? init() : init;
    }
    return ref.current;
}

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
    const ref = useConst(() => new ObservableRef(defaultValue));
    return ref;
};

const ScrollContext = React.createContext(null);
/**
 * Creates a `MotionValue` that updates when the velocity of the provided `MotionValue` changes.
 *
 * ```javascript
 * const x = useMotionValue(0)
 * const xVelocity = useVelocity(x)
 * const xAcceleration = useVelocity(xVelocity)
 * ```
 *
 * @public
 */
function useVelocity(value) {
    const velocity = useConst(() => framerMotion.motionValue(value.getVelocity()));
    React.useEffect(() => {
        return value.velocityUpdateSubscribers.add((newVelocity) => {
            velocity.set(newVelocity);
        });
    }, [value]);
    return velocity;
}
const ScrollProvider = React.forwardRef((_a, ref) => {
    var { children, style } = _a, otherProps = __rest(_a, ["children", "style"]);
    const { scrollX, scrollY } = framerMotion.useElementScroll(ref);
    const rawVelocityX = useVelocity(scrollX);
    const rawVelocityY = useVelocity(scrollY);
    const velocityX = framerMotion.useSpring(rawVelocityX, {
        stiffness: 100,
        damping: 10,
        mass: 0.05,
    });
    const velocityY = framerMotion.useSpring(rawVelocityY, {
        stiffness: 100,
        damping: 10,
        mass: 0.05,
    });
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
        React__default["default"].createElement(framerMotion.motion.div, { style: { display: 'none', x: velocityX, y: velocityY } }),
        React__default["default"].createElement(framerMotion.motion.div, Object.assign({}, otherProps, { ref: ref, style: Object.assign({ scrollBehavior: 'smooth', overflow: 'auto' }, style) }), children)));
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

function assignRef(ref, value) {
    if (typeof ref === 'function') {
        ref(value);
    }
    else if (ref) {
        ref.current = value;
    }
    return ref;
}
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
const Container = React.forwardRef((_a, forwardedRef) => {
    var { scrollAxis = 'y', throttleAmount = 90, children } = _a, otherProps = __rest(_a, ["scrollAxis", "throttleAmount", "children"]);
    const containerRef = useObservableRef(null);
    const layoutManager = useScrollLayoutManager({ scrollAxis });
    useResizeObserver(containerRef, (entry) => {
        layoutManager.setContainerRect(getRect(entry.target));
    });
    React.useLayoutEffect(() => {
        return containerRef.subscribe((el) => {
            assignRef(forwardedRef, el);
        });
    }, []);
    const scrollContainerApi = React.useMemo(() => ({
        scrollAxis,
        layoutManager,
        throttleAmount,
    }), [scrollAxis, layoutManager, throttleAmount]);
    return (React__default["default"].createElement(ScrollContainerContext.Provider, { value: scrollContainerApi },
        React__default["default"].createElement(ScrollProvider, Object.assign({}, otherProps, { style: Object.assign({ position: 'relative', whiteSpace: 'nowrap', overflowX: scrollAxis === 'x' ? 'auto' : 'hidden', overflowY: scrollAxis === 'y' ? 'auto' : 'hidden' }, otherProps.style), ref: containerRef }), children)));
});

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

let counter = 0;
const nextId = () => {
    counter = counter + 1;
    return String(counter);
};
const useId = () => useConst(nextId);

const SectionContext = React.createContext(null);
const useSection = () => {
    return React.useContext(SectionContext);
};
const Section = React.forwardRef((_a, forwardedRef) => {
    var { showOverflow = false, children, className } = _a, otherProps = __rest(_a, ["showOverflow", "children", "className"]);
    const sectionRef = useObservableRef(null);
    const sectionId = useId();
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
        React__default["default"].createElement(framerMotion.motion.div, Object.assign({}, otherProps, { ref: (el) => {
                assignRef(forwardedRef, el);
                assignRef(sectionRef, el);
            }, className: _className, style: Object.assign({ position: 'relative', visibility: isReady ? 'visible' : 'hidden', overflow: showOverflow ? 'visible' : 'hidden', whiteSpace: 'normal' }, otherProps.style) }), children)));
});

var warning = function () { };
var invariant = function () { };
if (process.env.NODE_ENV !== 'production') {
    warning = function (check, message) {
        if (!check && typeof console !== 'undefined') {
            console.warn(message);
        }
    };
    invariant = function (check, message) {
        if (!check) {
            throw new Error(message);
        }
    };
}

const clamp$1 = (min, max, v) => Math.min(Math.max(v, min), max);

const progress = (from, to, value) => {
    const toFromDifference = to - from;
    return toFromDifference === 0 ? 1 : (value - from) / toFromDifference;
};

const mix = (from, to, progress) => -progress * from + progress * to + from;

const clamp = (min, max) => (v) => Math.max(Math.min(v, max), min);
const sanitize = (v) => (v % 1 ? Number(v.toFixed(5)) : v);
const floatRegex = /(-)?([\d]*\.?[\d])+/g;
const colorRegex = /(#[0-9a-f]{6}|#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2,3}\s*\/*\s*[\d\.]+%?\))/gi;
const singleColorRegex = /^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2,3}\s*\/*\s*[\d\.]+%?\))$/i;
function isString(v) {
    return typeof v === 'string';
}

const number = {
    test: (v) => typeof v === 'number',
    parse: parseFloat,
    transform: (v) => v,
};
const alpha = Object.assign(Object.assign({}, number), { transform: clamp(0, 1) });
Object.assign(Object.assign({}, number), { default: 1 });

const createUnitType = (unit) => ({
    test: (v) => isString(v) && v.endsWith(unit) && v.split(' ').length === 1,
    parse: parseFloat,
    transform: (v) => `${v}${unit}`,
});
const percent = createUnitType('%');
Object.assign(Object.assign({}, percent), { parse: (v) => percent.parse(v) / 100, transform: (v) => percent.transform(v * 100) });

const isColorString = (type, testProp) => (v) => {
    return Boolean((isString(v) && singleColorRegex.test(v) && v.startsWith(type)) ||
        (testProp && Object.prototype.hasOwnProperty.call(v, testProp)));
};
const splitColor = (aName, bName, cName) => (v) => {
    if (!isString(v))
        return v;
    const [a, b, c, alpha] = v.match(floatRegex);
    return {
        [aName]: parseFloat(a),
        [bName]: parseFloat(b),
        [cName]: parseFloat(c),
        alpha: alpha !== undefined ? parseFloat(alpha) : 1,
    };
};

const hsla = {
    test: isColorString('hsl', 'hue'),
    parse: splitColor('hue', 'saturation', 'lightness'),
    transform: ({ hue, saturation, lightness, alpha: alpha$1 = 1 }) => {
        return ('hsla(' +
            Math.round(hue) +
            ', ' +
            percent.transform(sanitize(saturation)) +
            ', ' +
            percent.transform(sanitize(lightness)) +
            ', ' +
            sanitize(alpha.transform(alpha$1)) +
            ')');
    },
};

const clampRgbUnit = clamp(0, 255);
const rgbUnit = Object.assign(Object.assign({}, number), { transform: (v) => Math.round(clampRgbUnit(v)) });
const rgba = {
    test: isColorString('rgb', 'red'),
    parse: splitColor('red', 'green', 'blue'),
    transform: ({ red, green, blue, alpha: alpha$1 = 1 }) => 'rgba(' +
        rgbUnit.transform(red) +
        ', ' +
        rgbUnit.transform(green) +
        ', ' +
        rgbUnit.transform(blue) +
        ', ' +
        sanitize(alpha.transform(alpha$1)) +
        ')',
};

function parseHex(v) {
    let r = '';
    let g = '';
    let b = '';
    let a = '';
    if (v.length > 5) {
        r = v.substr(1, 2);
        g = v.substr(3, 2);
        b = v.substr(5, 2);
        a = v.substr(7, 2);
    }
    else {
        r = v.substr(1, 1);
        g = v.substr(2, 1);
        b = v.substr(3, 1);
        a = v.substr(4, 1);
        r += r;
        g += g;
        b += b;
        a += a;
    }
    return {
        red: parseInt(r, 16),
        green: parseInt(g, 16),
        blue: parseInt(b, 16),
        alpha: a ? parseInt(a, 16) / 255 : 1,
    };
}
const hex = {
    test: isColorString('#'),
    parse: parseHex,
    transform: rgba.transform,
};

const color = {
    test: (v) => rgba.test(v) || hex.test(v) || hsla.test(v),
    parse: (v) => {
        if (rgba.test(v)) {
            return rgba.parse(v);
        }
        else if (hsla.test(v)) {
            return hsla.parse(v);
        }
        else {
            return hex.parse(v);
        }
    },
    transform: (v) => {
        return isString(v)
            ? v
            : v.hasOwnProperty('red')
                ? rgba.transform(v)
                : hsla.transform(v);
    },
};

const colorToken = '${c}';
const numberToken = '${n}';
function test(v) {
    var _a, _b, _c, _d;
    return (isNaN(v) &&
        isString(v) &&
        ((_b = (_a = v.match(floatRegex)) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) + ((_d = (_c = v.match(colorRegex)) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0) > 0);
}
function analyse$1(v) {
    if (typeof v === 'number')
        v = `${v}`;
    const values = [];
    let numColors = 0;
    const colors = v.match(colorRegex);
    if (colors) {
        numColors = colors.length;
        v = v.replace(colorRegex, colorToken);
        values.push(...colors.map(color.parse));
    }
    const numbers = v.match(floatRegex);
    if (numbers) {
        v = v.replace(floatRegex, numberToken);
        values.push(...numbers.map(number.parse));
    }
    return { values, numColors, tokenised: v };
}
function parse(v) {
    return analyse$1(v).values;
}
function createTransformer(v) {
    const { values, numColors, tokenised } = analyse$1(v);
    const numValues = values.length;
    return (v) => {
        let output = tokenised;
        for (let i = 0; i < numValues; i++) {
            output = output.replace(i < numColors ? colorToken : numberToken, i < numColors ? color.transform(v[i]) : sanitize(v[i]));
        }
        return output;
    };
}
const convertNumbersToZero = (v) => typeof v === 'number' ? 0 : v;
function getAnimatableNone(v) {
    const parsed = parse(v);
    const transformer = createTransformer(v);
    return transformer(parsed.map(convertNumbersToZero));
}
const complex = { test, parse, createTransformer, getAnimatableNone };

const maxDefaults = new Set(['brightness', 'contrast', 'saturate', 'opacity']);
function applyDefaultFilter(v) {
    let [name, value] = v.slice(0, -1).split('(');
    if (name === 'drop-shadow')
        return v;
    const [number] = value.match(floatRegex) || [];
    if (!number)
        return v;
    const unit = value.replace(number, '');
    let defaultValue = maxDefaults.has(name) ? 1 : 0;
    if (number !== value)
        defaultValue *= 100;
    return name + '(' + defaultValue + unit + ')';
}
const functionRegex = /([a-z-]*)\(.*?\)/g;
Object.assign(Object.assign({}, complex), { getAnimatableNone: (v) => {
        const functions = v.match(functionRegex);
        return functions ? functions.map(applyDefaultFilter).join(' ') : v;
    } });

function hueToRgb(p, q, t) {
    if (t < 0)
        t += 1;
    if (t > 1)
        t -= 1;
    if (t < 1 / 6)
        return p + (q - p) * 6 * t;
    if (t < 1 / 2)
        return q;
    if (t < 2 / 3)
        return p + (q - p) * (2 / 3 - t) * 6;
    return p;
}
function hslaToRgba({ hue, saturation, lightness, alpha }) {
    hue /= 360;
    saturation /= 100;
    lightness /= 100;
    let red = 0;
    let green = 0;
    let blue = 0;
    if (!saturation) {
        red = green = blue = lightness;
    }
    else {
        const q = lightness < 0.5
            ? lightness * (1 + saturation)
            : lightness + saturation - lightness * saturation;
        const p = 2 * lightness - q;
        red = hueToRgb(p, q, hue + 1 / 3);
        green = hueToRgb(p, q, hue);
        blue = hueToRgb(p, q, hue - 1 / 3);
    }
    return {
        red: Math.round(red * 255),
        green: Math.round(green * 255),
        blue: Math.round(blue * 255),
        alpha,
    };
}

const mixLinearColor = (from, to, v) => {
    const fromExpo = from * from;
    const toExpo = to * to;
    return Math.sqrt(Math.max(0, v * (toExpo - fromExpo) + fromExpo));
};
const colorTypes = [hex, rgba, hsla];
const getColorType = (v) => colorTypes.find((type) => type.test(v));
const notAnimatable = (color) => `'${color}' is not an animatable color. Use the equivalent color code instead.`;
const mixColor = (from, to) => {
    let fromColorType = getColorType(from);
    let toColorType = getColorType(to);
    invariant(!!fromColorType, notAnimatable(from));
    invariant(!!toColorType, notAnimatable(to));
    let fromColor = fromColorType.parse(from);
    let toColor = toColorType.parse(to);
    if (fromColorType === hsla) {
        fromColor = hslaToRgba(fromColor);
        fromColorType = rgba;
    }
    if (toColorType === hsla) {
        toColor = hslaToRgba(toColor);
        toColorType = rgba;
    }
    const blended = Object.assign({}, fromColor);
    return (v) => {
        for (const key in blended) {
            if (key !== "alpha") {
                blended[key] = mixLinearColor(fromColor[key], toColor[key], v);
            }
        }
        blended.alpha = mix(fromColor.alpha, toColor.alpha, v);
        return fromColorType.transform(blended);
    };
};

const isNum = (v) => typeof v === 'number';

const combineFunctions = (a, b) => (v) => b(a(v));
const pipe = (...transformers) => transformers.reduce(combineFunctions);

function getMixer(origin, target) {
    if (isNum(origin)) {
        return (v) => mix(origin, target, v);
    }
    else if (color.test(origin)) {
        return mixColor(origin, target);
    }
    else {
        return mixComplex(origin, target);
    }
}
const mixArray = (from, to) => {
    const output = [...from];
    const numValues = output.length;
    const blendValue = from.map((fromThis, i) => getMixer(fromThis, to[i]));
    return (v) => {
        for (let i = 0; i < numValues; i++) {
            output[i] = blendValue[i](v);
        }
        return output;
    };
};
const mixObject = (origin, target) => {
    const output = Object.assign(Object.assign({}, origin), target);
    const blendValue = {};
    for (const key in output) {
        if (origin[key] !== undefined && target[key] !== undefined) {
            blendValue[key] = getMixer(origin[key], target[key]);
        }
    }
    return (v) => {
        for (const key in blendValue) {
            output[key] = blendValue[key](v);
        }
        return output;
    };
};
function analyse(value) {
    const parsed = complex.parse(value);
    const numValues = parsed.length;
    let numNumbers = 0;
    let numRGB = 0;
    let numHSL = 0;
    for (let i = 0; i < numValues; i++) {
        if (numNumbers || typeof parsed[i] === "number") {
            numNumbers++;
        }
        else {
            if (parsed[i].hue !== undefined) {
                numHSL++;
            }
            else {
                numRGB++;
            }
        }
    }
    return { parsed, numNumbers, numRGB, numHSL };
}
const mixComplex = (origin, target) => {
    const template = complex.createTransformer(target);
    const originStats = analyse(origin);
    const targetStats = analyse(target);
    const canInterpolate = originStats.numHSL === targetStats.numHSL &&
        originStats.numRGB === targetStats.numRGB &&
        originStats.numNumbers >= targetStats.numNumbers;
    if (canInterpolate) {
        return pipe(mixArray(originStats.parsed, targetStats.parsed), template);
    }
    else {
        warning(true, `Complex values '${origin}' and '${target}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`);
        return (p) => `${p > 0 ? target : origin}`;
    }
};

const mixNumber = (from, to) => (p) => mix(from, to, p);
function detectMixerFactory(v) {
    if (typeof v === 'number') {
        return mixNumber;
    }
    else if (typeof v === 'string') {
        if (color.test(v)) {
            return mixColor;
        }
        else {
            return mixComplex;
        }
    }
    else if (Array.isArray(v)) {
        return mixArray;
    }
    else if (typeof v === 'object') {
        return mixObject;
    }
}
function createMixers(output, ease, customMixer) {
    const mixers = [];
    const mixerFactory = customMixer || detectMixerFactory(output[0]);
    const numMixers = output.length - 1;
    for (let i = 0; i < numMixers; i++) {
        let mixer = mixerFactory(output[i], output[i + 1]);
        if (ease) {
            const easingFunction = Array.isArray(ease) ? ease[i] : ease;
            mixer = pipe(easingFunction, mixer);
        }
        mixers.push(mixer);
    }
    return mixers;
}
function fastInterpolate([from, to], [mixer]) {
    return (v) => mixer(progress(from, to, v));
}
function slowInterpolate(input, mixers) {
    const inputLength = input.length;
    const lastInputIndex = inputLength - 1;
    return (v) => {
        let mixerIndex = 0;
        let foundMixerIndex = false;
        if (v <= input[0]) {
            foundMixerIndex = true;
        }
        else if (v >= input[lastInputIndex]) {
            mixerIndex = lastInputIndex - 1;
            foundMixerIndex = true;
        }
        if (!foundMixerIndex) {
            let i = 1;
            for (; i < inputLength; i++) {
                if (input[i] > v || i === lastInputIndex) {
                    break;
                }
            }
            mixerIndex = i - 1;
        }
        const progressInRange = progress(input[mixerIndex], input[mixerIndex + 1], v);
        return mixers[mixerIndex](progressInRange);
    };
}
function interpolate(input, output, { clamp: isClamp = true, ease, mixer } = {}) {
    const inputLength = input.length;
    invariant(inputLength === output.length, 'Both input and output ranges must be the same length');
    invariant(!ease || !Array.isArray(ease) || ease.length === inputLength - 1, 'Array of easing functions must be of length `input.length - 1`, as it applies to the transitions **between** the defined values.');
    if (input[0] > input[inputLength - 1]) {
        input = [].concat(input);
        output = [].concat(output);
        input.reverse();
        output.reverse();
    }
    const mixers = createMixers(output, ease, mixer);
    const interpolator = inputLength === 2
        ? fastInterpolate(input, mixers)
        : slowInterpolate(input, mixers);
    return isClamp
        ? (v) => interpolator(clamp$1(input[0], input[inputLength - 1], v))
        : interpolator;
}

const mirrorEasing = easing => p => p <= 0.5 ? easing(2 * p) / 2 : (2 - easing(2 * (1 - p))) / 2;
const createExpoIn = (power) => p => Math.pow(p, power);

const easeIn = createExpoIn(2);
const easeInOut = mirrorEasing(easeIn);

function defaultEasing(values, easing) {
    return values.map(() => easing || easeInOut).splice(0, values.length - 1);
}
function defaultOffset(values) {
    const numValues = values.length;
    return values.map((_value, i) => i !== 0 ? i / (numValues - 1) : 0);
}
function convertOffsetToTimes(offset, duration) {
    return offset.map((o) => o * duration);
}
function keyframes({ from = 0, to = 1, ease, offset, duration = 300, }) {
    const state = { done: false, value: from };
    const values = Array.isArray(to) ? to : [from, to];
    const times = convertOffsetToTimes(offset && offset.length === values.length
        ? offset
        : defaultOffset(values), duration);
    function createInterpolator() {
        return interpolate(times, values, {
            ease: Array.isArray(ease) ? ease : defaultEasing(values, ease),
        });
    }
    let interpolator = createInterpolator();
    return {
        next: (t) => {
            state.value = interpolator(t);
            state.done = t >= duration;
            return state;
        },
        flipTarget: () => {
            values.reverse();
            interpolator = createInterpolator();
        },
    };
}

const defaultTimestep = (1 / 60) * 1000;
const getCurrentTime = typeof performance !== "undefined"
    ? () => performance.now()
    : () => Date.now();
const onNextFrame = typeof window !== "undefined"
    ? (callback) => window.requestAnimationFrame(callback)
    : (callback) => setTimeout(() => callback(getCurrentTime()), defaultTimestep);

function createRenderStep(runNextFrame) {
    let toRun = [];
    let toRunNextFrame = [];
    let numToRun = 0;
    let isProcessing = false;
    let flushNextFrame = false;
    const toKeepAlive = new WeakSet();
    const step = {
        schedule: (callback, keepAlive = false, immediate = false) => {
            const addToCurrentFrame = immediate && isProcessing;
            const buffer = addToCurrentFrame ? toRun : toRunNextFrame;
            if (keepAlive)
                toKeepAlive.add(callback);
            if (buffer.indexOf(callback) === -1) {
                buffer.push(callback);
                if (addToCurrentFrame && isProcessing)
                    numToRun = toRun.length;
            }
            return callback;
        },
        cancel: (callback) => {
            const index = toRunNextFrame.indexOf(callback);
            if (index !== -1)
                toRunNextFrame.splice(index, 1);
            toKeepAlive.delete(callback);
        },
        process: (frameData) => {
            if (isProcessing) {
                flushNextFrame = true;
                return;
            }
            isProcessing = true;
            [toRun, toRunNextFrame] = [toRunNextFrame, toRun];
            toRunNextFrame.length = 0;
            numToRun = toRun.length;
            if (numToRun) {
                for (let i = 0; i < numToRun; i++) {
                    const callback = toRun[i];
                    callback(frameData);
                    if (toKeepAlive.has(callback)) {
                        step.schedule(callback);
                        runNextFrame();
                    }
                }
            }
            isProcessing = false;
            if (flushNextFrame) {
                flushNextFrame = false;
                step.process(frameData);
            }
        },
    };
    return step;
}

const maxElapsed = 40;
let useDefaultElapsed = true;
let runNextFrame = false;
let isProcessing = false;
const frame = {
    delta: 0,
    timestamp: 0,
};
const stepsOrder = [
    "read",
    "update",
    "preRender",
    "render",
    "postRender",
];
const steps = stepsOrder.reduce((acc, key) => {
    acc[key] = createRenderStep(() => (runNextFrame = true));
    return acc;
}, {});
stepsOrder.reduce((acc, key) => {
    const step = steps[key];
    acc[key] = (process, keepAlive = false, immediate = false) => {
        if (!runNextFrame)
            startLoop();
        return step.schedule(process, keepAlive, immediate);
    };
    return acc;
}, {});
stepsOrder.reduce((acc, key) => {
    acc[key] = steps[key].cancel;
    return acc;
}, {});
stepsOrder.reduce((acc, key) => {
    acc[key] = () => steps[key].process(frame);
    return acc;
}, {});
const processStep = (stepId) => steps[stepId].process(frame);
const processFrame = (timestamp) => {
    runNextFrame = false;
    frame.delta = useDefaultElapsed
        ? defaultTimestep
        : Math.max(Math.min(timestamp - frame.timestamp, maxElapsed), 1);
    frame.timestamp = timestamp;
    isProcessing = true;
    stepsOrder.forEach(processStep);
    isProcessing = false;
    if (runNextFrame) {
        useDefaultElapsed = false;
        onNextFrame(processFrame);
    }
};
const startLoop = () => {
    runNextFrame = true;
    useDefaultElapsed = true;
    if (!isProcessing)
        onNextFrame(processFrame);
};

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

var lodash_throttle = throttle;

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
        anim = keyframes({
            to: [values[0], values[0]],
            offset: [offsets[0], offsets[0] + 1],
            duration: 1,
        });
    }
    else {
        anim = keyframes({
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
    const maxScrollPosition = layout.maxScrollPosition;
    return {
        section,
        container,
        maxScrollPosition,
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
        map.set(Number(offset) / layout.maxScrollPosition, keyframesObj[offset]);
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
    backgroundColor: {
        mass: 0.05,
        damping: 7.5,
        stiffness: 100,
    },
    color: {
        mass: 0.05,
        damping: 7.5,
        stiffness: 100,
    },
};
const Springs = ({ keyframes, springConfigs, data, onSprings }) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5;
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
            backgroundColor: getAnimationForProperty('backgroundColor', keyframesMap),
            color: getAnimationForProperty('color', keyframesMap),
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
        backgroundColor: framerMotion.useSpring((_3 = (_2 = animations.backgroundColor) === null || _2 === void 0 ? void 0 : _2.get(0)) !== null && _3 !== void 0 ? _3 : undefined, mergedSpringConfigs.backgroundColor),
        color: framerMotion.useSpring((_5 = (_4 = animations.color) === null || _4 === void 0 ? void 0 : _4.get(0)) !== null && _5 !== void 0 ? _5 : undefined, mergedSpringConfigs.color),
    };
    React.useEffect(() => {
        const updateSprings = lodash_throttle((scrollOffset) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5;
            const progress = scrollOffset / layoutManager.layout.maxScrollPosition;
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
            springs.backgroundColor.set((_3 = (_2 = animations.backgroundColor) === null || _2 === void 0 ? void 0 : _2.get(progress)) !== null && _3 !== void 0 ? _3 : undefined);
            springs.color.set((_5 = (_4 = animations.color) === null || _4 === void 0 ? void 0 : _4.get(progress)) !== null && _5 !== void 0 ? _5 : undefined);
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
        layoutManager.layout.maxScrollPosition,
    ]);
    React.useEffect(() => {
        onSprings(springs);
    }, []);
    return null;
};
const Item = React.forwardRef((_a, forwardedRef) => {
    var { keyframes = {}, springs: springConfigs = {}, data } = _a, otherProps = __rest(_a, ["keyframes", "springs", "data"]);
    const [springs, setSprings] = React.useState({});
    const section = useSection();
    if (!section) {
        throw new Error('Scroll.Item can only be used within a Scroll.Section');
    }
    return (React__default["default"].createElement(React__default["default"].Fragment, null,
        section.isReady && (React__default["default"].createElement(Springs, { keyframes: keyframes, springConfigs: springConfigs, data: data, onSprings: setSprings })),
        React__default["default"].createElement(framerMotion.motion.div, Object.assign({}, otherProps, { ref: (el) => {
                assignRef(forwardedRef, el);
            }, style: Object.assign(Object.assign({}, otherProps.style), { translateX: springs.translateX, translateY: springs.translateY, translateZ: springs.translateZ, scale: springs.scale, scaleX: springs.scaleX, scaleY: springs.scaleY, scaleZ: springs.scaleZ, skewX: springs.skewX, skewY: springs.skewY, rotateX: springs.rotateX, rotateY: springs.rotateY, rotateZ: springs.rotateZ, opacity: springs.opacity, backgroundColor: springs.backgroundColor, color: springs.color }) }))));
});

const getScrollStateContext = (layout, sectionId, position, velocity) => {
    const section = new LayoutSection(layout.sections[sectionId], layout.container);
    const container = new LayoutContainer(layout.container);
    const maxScrollPosition = layout.maxScrollPosition;
    return {
        section,
        container,
        maxScrollPosition,
        position,
        velocity,
    };
};
const useScrollState = (callback) => {
    const [state, setState] = React.useState();
    const container = useScrollContainer();
    const section = useSection();
    const scroll = useScroll();
    // const callbackRef = useLatestRef(callback);
    if (section === null) {
        throw new Error('Springs can only be used inside of a Scroll.Section');
    }
    if (container === null) {
        throw new Error('Springs can only be used within a Scroll.Container');
    }
    const { layoutManager, scrollAxis } = container;
    const maybeUpdateState = useLatestRef(() => {
        if (!section.isReady) {
            return;
        }
        const position = scrollAxis === 'x' ? scroll.position.x.get() : scroll.position.y.get();
        const velocity = scrollAxis === 'x' ? scroll.velocity.x.get() : scroll.velocity.y.get();
        const nextState = callback(getScrollStateContext(layoutManager.layout, section.sectionId, position, velocity));
        setState(nextState);
    });
    React.useEffect(() => {
        maybeUpdateState.current();
    }, [layoutManager.layout, section.sectionId, section.isReady, scrollAxis]);
    React.useEffect(() => {
        if (scrollAxis === 'x') {
            return scroll.position.x.onChange(() => {
                maybeUpdateState.current();
            });
        }
        else {
            return scroll.position.y.onChange(() => {
                maybeUpdateState.current();
            });
        }
    }, [scrollAxis]);
    React.useEffect(() => {
        if (scrollAxis === 'x') {
            return scroll.velocity.x.onChange(() => {
                maybeUpdateState.current();
            });
        }
        else {
            return scroll.velocity.y.onChange(() => {
                maybeUpdateState.current();
            });
        }
    }, [scrollAxis]);
    return state;
};

const getScrollValueContext = (layout, sectionId, position, velocity) => {
    const section = new LayoutSection(layout.sections[sectionId], layout.container);
    const container = new LayoutContainer(layout.container);
    const maxScrollPosition = layout.maxScrollPosition;
    return {
        section,
        container,
        maxScrollPosition,
        position,
        velocity,
    };
};
const useScrollValue = (callback) => {
    const value = framerMotion.useMotionValue(undefined);
    const container = useScrollContainer();
    const section = useSection();
    const scroll = useScroll();
    // const callbackRef = useLatestRef(callback);
    if (section === null) {
        throw new Error('Springs can only be used inside of a Scroll.Section');
    }
    if (container === null) {
        throw new Error('Springs can only be used within a Scroll.Container');
    }
    const { layoutManager, scrollAxis } = container;
    const maybeUpdateValue = useLatestRef(() => {
        if (!section.isReady) {
            return;
        }
        const position = scrollAxis === 'x' ? scroll.position.x.get() : scroll.position.y.get();
        const velocity = scrollAxis === 'x' ? scroll.velocity.x.get() : scroll.velocity.y.get();
        const nextValue = callback(getScrollValueContext(layoutManager.layout, section.sectionId, position, velocity));
        value.set(nextValue);
    });
    React.useEffect(() => {
        maybeUpdateValue.current();
    }, [layoutManager.layout, section.sectionId, section.isReady, scrollAxis]);
    React.useEffect(() => {
        if (scrollAxis === 'x') {
            return scroll.position.x.onChange(() => {
                maybeUpdateValue.current();
            });
        }
        else {
            return scroll.position.y.onChange(() => {
                maybeUpdateValue.current();
            });
        }
    }, [scrollAxis]);
    React.useEffect(() => {
        if (scrollAxis === 'x') {
            return scroll.velocity.x.onChange(() => {
                maybeUpdateValue.current();
            });
        }
        else {
            return scroll.velocity.y.onChange(() => {
                maybeUpdateValue.current();
            });
        }
    }, [scrollAxis]);
    return value;
};

const Scroll = {
    Container,
    Section,
    Item,
};

exports.Scroll = Scroll;
exports.useScrollState = useScrollState;
exports.useScrollValue = useScrollValue;
//# sourceMappingURL=index.js.map
