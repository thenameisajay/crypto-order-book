import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { connectToWebSocket } from '~/server/trpc/ws';
import { OrderBookSchema } from '~/types/schemas/OrderBookSchema';

export const orderBookRouter = createTRPCRouter({
getOrderBook: publicProcedure.query(async ({ ctx }) => {
await connectToWebSocket(ctx);
const data = await ctx.db.orderBookData.findMany({
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
take: 1,
});

        const formattedOrderBookData = data.map((item) => ({
            id: item.id,
            timestamp: item.timestamp,
            exchange: item.exchange,
            coin: item.coin,
            asks: typeof item.asks === 'string' ? JSON.parse(item.asks) : [],
            bids: typeof item.bids === 'string' ? JSON.parse(item.bids) : [],
        }));

        return formattedOrderBookData;
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
