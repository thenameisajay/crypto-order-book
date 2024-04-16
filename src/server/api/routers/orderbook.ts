import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { connectToWebSocket } from '~/server/trpc/ws';

export const orderBookRouter = createTRPCRouter({
    getOrderBook: publicProcedure.query(async () => {
        const orderBookData = await connectToWebSocket();
        return orderBookData;
    }),
});
