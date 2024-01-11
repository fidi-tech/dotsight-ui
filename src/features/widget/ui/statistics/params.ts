import {z} from 'zod';
import {zodToJsonSchema} from 'zod-to-json-schema';

export const customization = z.object({
  unit: z.string().default('usd'),
});
export type Customization = z.infer<typeof customization>;
export const customizationSchema = zodToJsonSchema(customization, "customizationSchema");