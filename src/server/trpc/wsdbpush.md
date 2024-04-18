import type { inferRouterContext } from '@trpc/server';
import { WebSocket } from 'ws';
import type { AppRouter } from '~/server/api/root';
import type { OrderBookData } from '~/types/interfaces/orderBookData';
import { OrderBookSchema } from '~/types/schemas/OrderBookSchema';

export async function connectToWebSocket(ctx: inferRouterContext<AppRouter>) {
await new Promise<void>((resolve, reject) => {
const ws = new WebSocket(process.env.WS_URL as string);

        ws.on('open', () => {
            console.log('WebSocket connection established');
        });

        ws.on('message', (data: OrderBookData) => {
            try {
                const orderBookData: OrderBookData = JSON.parse(
                    data.toString(),
                );
                const validatedData = OrderBookSchema.parse(orderBookData);

                // Store the data in the db
                ctx.db.orderBookData
                    .create({
                        data: {
                            exchange: validatedData.exchange,
                            coin: validatedData.coin,
                            timestamp: validatedData.timestamp,
                            bids: JSON.stringify(validatedData.bids),
                            asks: JSON.stringify(validatedData.asks),
                        },
                    })
                    .then(() => {
                        console.log('Data stored in the db successfully');
                    })
                    .catch((error) => {
                        console.error('Error storing data in the db:', error);
                    });
            } catch (error) {
                console.error('Error parsing data:', error);
            }
        });

        ws.on('error', (error: string) => {
            reject(error);
        });

        ws.on('close', () => {
            console.log('WebSocket connection closed');
            resolve();
        });
    });

}
