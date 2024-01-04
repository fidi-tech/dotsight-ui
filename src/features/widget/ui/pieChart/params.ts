import {z} from 'zod';
import {zodToJsonSchema} from 'zod-to-json-schema';

import {PaletteVariant} from '@/shared/ui/styles/palettes';

export const parameters = z.object({
  walletIds: z.array(z.string()),
});
export type Parameters = z.infer<typeof parameters>;
export const parametersSchema = zodToJsonSchema(parameters, "parametersSchema");

export const customization = z.object({
  count: z.coerce.number().int().min(1),
  order: z.enum(['ASC', 'DESC'] as const).optional(),
  palette: z.enum([PaletteVariant.v1, PaletteVariant.v2, PaletteVariant.v3] as const),
  unit: z.string().default('usd'),
});
export type Customization = z.infer<typeof customization>;
