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
                bids: JSON.stringify(validatedData.bids),
                asks: JSON.stringify(validatedData.asks),
            },
        });
        console.log('Data stored in the db successfully');

        const orderBookArray = [];

        orderBookArray.push(validatedData);

        return orderBookArray;
    }),

    getStorageOrderBookData: publicProcedure.query(async ({ ctx }) => {
        const orderBookData = await ctx.db.orderBookData.findMany({
            orderBy: {
                timestamp: 'desc',
            },
            select: {
                id: true,
                timestamp: true,
                exchange: true,
                coin: true,
                asks: true,
                bids: true,
            },
            take: 10,
        });

        const formattedOrderBookData = orderBookData.map((item) => ({
            id: item.id,
            timestamp: item.timestamp,
            exchange: item.exchange,
            coin: item.coin,
            asks: typeof item.asks === 'string' ? JSON.parse(item.asks) : [],
            bids: typeof item.bids === 'string' ? JSON.parse(item.bids) : [],
        }));

        return formattedOrderBookData;
    }),
});
