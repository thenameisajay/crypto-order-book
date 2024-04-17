import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { connectToWebSocket } from '~/server/trpc/ws';
import { OrderBookSchema } from '~/types/schemas/OrderBookSchema';

export const orderBookRouter = createTRPCRouter({
    getOrderBook: publicProcedure.query(async ({ ctx }) => {
        const orderBookData = await connectToWebSocket();

        const validatedData = OrderBookSchema.parse(orderBookData);

        // Store the data in the db
        await ctx.db.orderBookData.create({
            data: {
                exchange: validatedData.exchange,
                coin: validatedData.coin,
                timestamp: validatedData.timestamp,
                asks: {
                    create: validatedData.asks.map((ask) => ({
                        price: ask[0],
                        size: ask[1],
                    })),
                },
                bids: {
                    create: validatedData.bids.map((bid) => ({
                        price: bid[0],
                        size: bid[1],
                    })),
                },
            },
        });
        console.log('Data stored in the db successfully');

        const orderBookArray = [];

        orderBookArray.push(validatedData);

        return orderBookArray;
    }),
});
