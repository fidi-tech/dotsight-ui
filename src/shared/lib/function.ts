import {TimeoutId} from '@/shared/lib/types';

export const debounce = <T extends Function>(cb: T, wait = 10) => {
    let h: TimeoutId | null = null;
    let callable = (...args: any) => {
        if (h) {
            clearTimeout(h);
        }
        h = setTimeout(() => cb(...args), wait);
    };
    return <T>(<any>callable);
}