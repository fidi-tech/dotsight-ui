import {z} from 'zod';

export const customization = z.object({
  unit: z.string().default('usd'),
});
export type Customization = z.infer<typeof customization>;
