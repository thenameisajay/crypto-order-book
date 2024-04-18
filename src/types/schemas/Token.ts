import z from 'zod';

export const TokenSchema = z.object({
    token: z.string(),
});

export type Token = z.infer<typeof TokenSchema>;
