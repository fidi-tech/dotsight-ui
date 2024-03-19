import {Preset} from './types';

export const getPresetId = (preset: Preset) => preset.id;
export const getPresetIsSelected = (preset: Preset) => preset.isSelected;
export const getPresetName = (preset: Preset) => preset.name;
export const getPresetIcon = (preset: Preset) => preset.icon;
