import { FC, HTMLProps } from 'react';
import { LayoutManager } from '../hooks/useScrollLayoutManager';
export interface ScrollContainerApi {
    layoutManager: LayoutManager;
    scrollAxis: 'x' | 'y';
    throttleAmount: number;
}
export declare const useScrollContainer: () => ScrollContainerApi | null;
export interface ScrollContainerProps extends HTMLProps<HTMLDivElement> {
    scrollAxis?: 'x' | 'y';
    throttleAmount?: number;
}
declare const Container: FC<ScrollContainerProps>;
export default Container;
