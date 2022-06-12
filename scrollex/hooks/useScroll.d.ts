import React from 'react';
import { HTMLMotionProps, MotionValue } from 'framer-motion';
interface ScrollProviderProps extends HTMLMotionProps<'div'> {
}
interface ScrollValues {
    position: {
        x: MotionValue<number>;
        y: MotionValue<number>;
    };
    velocity: {
        x: MotionValue<number>;
        y: MotionValue<number>;
    };
}
/**
 * Creates a `MotionValue` that updates when the velocity of the provided `MotionValue` changes.
 *
 * ```javascript
 * const x = useMotionValue(0)
 * const xVelocity = useVelocity(x)
 * const xAcceleration = useVelocity(xVelocity)
 * ```
 *
 * @public
 */
export declare function useVelocity(value: MotionValue<number>): MotionValue<number>;
export declare const ScrollProvider: React.ForwardRefExoticComponent<ScrollProviderProps & React.RefAttributes<HTMLDivElement>>;
export declare const useScroll: () => ScrollValues;
export {};
