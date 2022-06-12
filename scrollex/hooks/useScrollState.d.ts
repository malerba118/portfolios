import { LayoutContainer, LayoutSection } from '../utils';
declare type ScrollStateContext = {
    section: LayoutSection;
    container: LayoutContainer;
    maxScrollPosition: number;
    position: number;
    velocity: number;
};
declare type ScrollStateFn<T extends number | string | null | undefined> = (context: ScrollStateContext) => T;
export declare const useScrollState: <T extends string | number | null | undefined>(callback: ScrollStateFn<T>) => T | undefined;
export {};
