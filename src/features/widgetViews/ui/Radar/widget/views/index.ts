import {UnitId} from '@/entities/unit/model';
import {MetricId} from '@/entities/metric/model';
import {SubCategoryId} from '@/entities/subCategory/model';

import {View as DefaultView, configuration as defaultConfiguration} from './default';

export type BaseProps = {
    items: Record<SubCategoryId, {id: SubCategoryId, name: string, icon?: string}>,
    chart: {
        fullMark: number,
        unitId?: UnitId,
        metric: MetricId,
    }[],
    metrics: Record<MetricId, {id: MetricId, name: string, icon?: string}>,
}

export enum ViewType {
    default = 'default',
}

export const ViewComponents = {
    [ViewType.default]: {
        configuration: defaultConfiguration,
        View: DefaultView,
    },
}