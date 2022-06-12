import { Rect } from '../utils';
interface UseScrollLayoutManagerParams {
    scrollAxis: 'x' | 'y';
}
export interface Layout {
    sections: Record<string, Rect>;
    container: Rect;
    maxScrollPosition: number;
}
export interface LayoutManager {
    layout: Layout;
    setContainerRect: (rect: Rect) => void;
    setSectionRect: (sectionId: string, rect: Rect) => void;
}
declare const useScrollLayoutManager: ({ scrollAxis, }: UseScrollLayoutManagerParams) => LayoutManager;
export default useScrollLayoutManager;
