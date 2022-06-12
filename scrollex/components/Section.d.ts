import React from 'react';
import { HTMLMotionProps } from 'framer-motion';
interface SectionContextApi {
    sectionId: string;
    isReady: boolean;
}
export declare const useSection: () => SectionContextApi | null;
export interface ScrollSectionProps extends HTMLMotionProps<'div'> {
    showOverflow?: boolean;
}
declare const Section: React.ForwardRefExoticComponent<ScrollSectionProps & React.RefAttributes<HTMLDivElement>>;
export default Section;
