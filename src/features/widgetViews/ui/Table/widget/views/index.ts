import {View as DefaultView} from './default';
import {View as DynamicView} from './dynamic';

export type BaseProps = {
    header: string[],
    rows: (string | null)[][],
};

export enum ViewType {
    default = 'default',
    dynamic = 'dynamic',
}

export const ViewComponents = {
    [ViewType.default]: {
        View: DefaultView,
    },
    [ViewType.dynamic]: {
        View: DynamicView,
    },
}