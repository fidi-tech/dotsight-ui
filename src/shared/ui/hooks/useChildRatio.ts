import {useCallback, useLayoutEffect, useState} from 'react';
import {debounce} from 'underscore';

type Props = {
    parentRef: any,
    extraChildrenRefs: any[],
    parentRatio: number,
}

export const useChildRatio = ({parentRef, extraChildrenRefs, parentRatio}: Props) => {
    const [ratio, setRatio] = useState(0.5);
    const [isInitiated, setIsInitiated] = useState(false);
    const initialize = useCallback(() => setIsInitiated(true), [setIsInitiated]);
    const debouncedInitialize = debounce(initialize, 10);

    useLayoutEffect(() => {
        const width = parentRef.current?.clientWidth;
        const extraHeight = extraChildrenRefs.reduce((height, ref) => height + ref.current?.clientHeight || 0, 0);
        const height = width / parentRatio;
        const responsiveHeight = height - extraHeight;
        setRatio(width / responsiveHeight);
        debouncedInitialize();
    }, [parentRef, extraChildrenRefs, parentRatio, debouncedInitialize]);

    return {
        ratio,
        isInitiated,
    }
}