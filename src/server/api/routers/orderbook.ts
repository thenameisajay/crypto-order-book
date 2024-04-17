import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { connectToWebSocket } from '~/server/trpc/ws';
import { OrderBookSchema } from '~/types/schemas/OrderBookSchema';

export const orderBookRouter = createTRPCRouter({
    getOrderBook: publicProcedure.query(async () => {
        const orderBookData = await connectToWebSocket();

        OrderBookSchema.parse(orderBookData);

        const orderBookArray = [];

        orderBookArray.push(orderBookData);

        return orderBookArray;
    }),
});
