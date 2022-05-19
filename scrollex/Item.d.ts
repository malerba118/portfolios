import { HTMLMotionProps } from 'framer-motion';
import { FC } from 'react';
import { SpringOptions } from 'popmotion';
import { LayoutSection, LayoutContainer } from '../utils';
export declare type StyleObj = {
    scale?: number | string;
    scaleX?: number | string;
    scaleY?: number | string;
    scaleZ?: number | string;
    translateX?: number | string;
    translateY?: number | string;
    translateZ?: number | string;
    rotateX?: number | string;
    rotateY?: number | string;
    rotateZ?: number | string;
    skewX?: number | string;
    skewY?: number | string;
    opacity?: number | string;
};
export declare type KeyframesContext = {
    section: LayoutSection;
    container: LayoutContainer;
    scrollMax: number;
    data?: any;
};
export declare type KeyframesObj = Record<number, StyleObj>;
export declare type KeyframesFn = (context: KeyframesContext) => KeyframesObj;
export declare type Keyframes = KeyframesFn | KeyframesObj;
export declare type KeyframesMap = Map<number, StyleObj>;
export declare type SpringConfigs = {
    scale?: SpringOptions;
    scaleX?: SpringOptions;
    scaleY?: SpringOptions;
    scaleZ?: SpringOptions;
    translateX?: SpringOptions;
    translateY?: SpringOptions;
    translateZ?: SpringOptions;
    rotateX?: SpringOptions;
    rotateY?: SpringOptions;
    rotateZ?: SpringOptions;
    skewX?: SpringOptions;
    skewY?: SpringOptions;
    opacity?: SpringOptions;
};
export interface ScrollItemProps extends HTMLMotionProps<'div'> {
    keyframes?: Keyframes;
    springs?: SpringConfigs;
    data?: any;
}
declare const Item: FC<ScrollItemProps>;
export default Item;
