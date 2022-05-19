import { FC } from 'react';
import { HTMLMotionProps } from 'framer-motion';
interface SectionContextApi {
    sectionId: string;
    isReady: boolean;
}
export declare const useSection: () => SectionContextApi | null;
export interface ScrollSectionProps extends HTMLMotionProps<'div'> {
    showOverflow?: boolean;
}
declare const Section: FC<ScrollSectionProps>;
export default Section;
