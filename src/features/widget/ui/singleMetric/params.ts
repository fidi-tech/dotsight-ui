import {z} from 'zod';
import {zodToJsonSchema} from 'zod-to-json-schema';

export const parameters = z.object({
  walletId: z.string(),
}).describe("Parameters");
export type Parameters = z.infer<typeof parameters>;
export const parametersSchema = zodToJsonSchema(parameters, "parametersSchema");

export const customization = z.object({
  label: z.string(),
  unit: z.string().default('usd'),
}).describe("Customization");
export type Customization = z.infer<typeof customization>;
export const customizationSchema = zodToJsonSchema(customization, "customizationSchema");
