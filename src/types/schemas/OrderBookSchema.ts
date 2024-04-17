import z from 'zod';

export const OrderBookSchema = z.object({
    timestamp: z.number(),
    exchange: z.string(),
    coin: z.string(),
    bids: z.array(z.array(z.number())),
    asks: z.array(z.array(z.number())),
});

export type OrderBook = z.infer<typeof OrderBookSchema>;
