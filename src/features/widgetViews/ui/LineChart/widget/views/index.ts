import {UnitId} from '@/entities/unit/model';
import {SubCategoryId} from '@/entities/subCategory/model';

import {View as DefaultView} from "./default";

export enum ViewType {
    default = 'default',
}

export type BaseProps = {
    title: string;
    chart: {
        [p: string]: number,
        timestamp: number,
    }[];
    keys: string[];
    items: Record<SubCategoryId, {id: SubCategoryId, name: string, icon?: string}>;
    unitId?: UnitId;
}

export const ViewComponents = {
    [ViewType.default]: {
        View: DefaultView,
    },
}