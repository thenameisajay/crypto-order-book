import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { connectToWebSocket } from '~/server/trpc/ws';
import { OrderBookSchema } from '~/types/schemas/OrderBookSchema';
import { TokenSchema } from '~/types/schemas/Token';

export const orderBookRouter = createTRPCRouter({
getOrderBook: publicProcedure.query(async ({ ctx }) => {
const orderBookDataObservable = await connectToWebSocket();

        orderBookDataObservable.subscribe({
            next: async (orderBookData) => {
                console.log(orderBookData);

                console.log('Data received from the WebSocket', orderBookData);

                const validatedData = OrderBookSchema.parse(orderBookData);

                // Store the data in the db
                void ctx.db.orderBookData.create({
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
            },
            error: (error) => {
                console.error('Error:', error);
            },
            complete: () => {
                console.log('WebSocket connection closed');
            },
        });
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

    getOrderBookDataByToken: publicProcedure
        .input(TokenSchema)
        .query(async ({ input, ctx }) => {
            const orderBookData = await ctx.db.orderBookData.findMany({
                where: {
                    coin: input.token,
                },
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
                asks:
                    typeof item.asks === 'string' ? JSON.parse(item.asks) : [],
                bids:
                    typeof item.bids === 'string' ? JSON.parse(item.bids) : [],
            }));

            return formattedOrderBookData;
        }),

});
