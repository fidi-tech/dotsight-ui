import {View as DefaultView, configuration as defaultConfiguration} from './default';
import {View as DynamicView, configuration as dynamicConfiguration} from './dynamic';

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
        configuration: defaultConfiguration,
        View: DefaultView,
    },
    [ViewType.dynamic]: {
        configuration: dynamicConfiguration,
        View: DynamicView,
    },
}