export type PresetId = string;

export type Preset = {
  icon: string | null,
  id: PresetId,
  isAvailable: boolean,
  isSelected: boolean,
  name: string,
}
