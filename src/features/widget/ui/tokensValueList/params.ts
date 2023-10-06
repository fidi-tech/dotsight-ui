import {z} from 'zod';
import {zodToJsonSchema} from 'zod-to-json-schema';

export const parameters = z.object({
  walletId: z.string(),
});
export type Parameters = z.infer<typeof parameters>;
export const parametersSchema = zodToJsonSchema(parameters, "parametersSchema");

export const customization = z.object({
  count: z.coerce.number().int().min(1),
  order: z.enum(['ASC', 'DESC'] as const).optional(),
  withMarks: z.boolean().optional(),
  palette: z.array(z.string()).optional().describe('Palette'),
  unit: z.string(),
});
export type Customization = z.infer<typeof customization>;
