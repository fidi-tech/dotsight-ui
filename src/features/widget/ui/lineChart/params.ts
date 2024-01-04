import {z} from 'zod';

import {PaletteVariant} from '@/shared/ui/styles/palettes';

export const customization = z.object({
  palette: z.enum([PaletteVariant.v1, PaletteVariant.v2, PaletteVariant.v3] as const),
  unit: z.string().default('usd'),
});
export type Customization = z.infer<typeof customization>;
