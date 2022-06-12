import React from 'react';
import { LayoutManager } from '../hooks/useScrollLayoutManager';
import { HTMLMotionProps } from 'framer-motion';
export interface ScrollContainerApi {
    layoutManager: LayoutManager;
    scrollAxis: 'x' | 'y';
    throttleAmount: number;
}
export declare const useScrollContainer: () => ScrollContainerApi | null;
export interface ScrollContainerProps extends HTMLMotionProps<'div'> {
    scrollAxis?: 'x' | 'y';
    throttleAmount?: number;
}
declare const Container: React.ForwardRefExoticComponent<ScrollContainerProps & React.RefAttributes<HTMLDivElement>>;
export default Container;
