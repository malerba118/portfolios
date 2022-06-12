import * as React from 'react';
export declare type RefCallback<T> = (newValue: T | null) => void;
export declare type RefObject<T> = React.MutableRefObject<T | null>;
export declare type DefinedReactRef<T> = RefCallback<T> | RefObject<T>;
export declare type ReactRef<T> = DefinedReactRef<T> | null;
export declare function assignRef<T>(ref: ReactRef<T>, value: T | null): ReactRef<T>;
export interface Rect {
    x: number;
    y: number;
    width: number;
    height: number;
}
export declare const getRect: (el: HTMLElement) => Rect;
export declare class LayoutSection {
    private container;
    private x;
    private y;
    height: number;
    width: number;
    constructor(section: Rect, container: Rect);
    topAt(position: 'container-top' | 'container-center' | 'container-bottom'): number;
    bottomAt(position: 'container-top' | 'container-center' | 'container-bottom'): number;
    leftAt(position: 'container-left' | 'container-center' | 'container-right'): number;
    rightAt(position: 'container-left' | 'container-center' | 'container-right'): number;
}
export declare class LayoutContainer {
    private x;
    private y;
    width: number;
    height: number;
    constructor(container: Rect);
}
