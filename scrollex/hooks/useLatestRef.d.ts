import * as React from 'react';
/**
 * React hook to persist any value between renders,
 * but keeps it up-to-date if it changes.
 *
 * @param value the value or function to persist
 */
declare const useLatestRef: <T>(value: T) => React.MutableRefObject<T>;
export default useLatestRef;
