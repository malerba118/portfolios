/// <reference types="react" />
import { useScrollState } from './hooks/useScrollState';
import { useScrollValue } from './hooks/useScrollValue';
export type { ScrollContainerProps } from './components/Container';
export type { ScrollSectionProps } from './components/Section';
export type { ScrollItemProps, Keyframes, KeyframesFn, KeyframesObj, KeyframesContext, SpringConfigs, } from './components/Item';
export declare const Scroll: {
    Container: import("react").ForwardRefExoticComponent<import("./components/Container").ScrollContainerProps & import("react").RefAttributes<HTMLDivElement>>;
    Section: import("react").ForwardRefExoticComponent<import("./components/Section").ScrollSectionProps & import("react").RefAttributes<HTMLDivElement>>;
    Item: import("react").ForwardRefExoticComponent<import("./components/Item").ScrollItemProps & import("react").RefAttributes<HTMLDivElement>>;
};
export { useScrollState, useScrollValue };
