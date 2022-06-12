import { MotionValue } from 'framer-motion';
import { LayoutContainer, LayoutSection } from '../utils';
declare type ScrollValueContext = {
    section: LayoutSection;
    container: LayoutContainer;
    maxScrollPosition: number;
    position: number;
    velocity: number;
};
declare type ScrollValueFn<T extends number | string | null | undefined> = (context: ScrollValueContext) => T;
export declare const useScrollValue: <T extends string | number>(callback: ScrollValueFn<T>) => MotionValue<T | undefined>;
export {};
