import { Rect } from './types';
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
