// src/server/trpc/ws.ts
import { WebSocket } from 'ws';
import type { OrderBookData } from '~/types/interfaces/orderBookData';

export function connectToWebSocket(): Promise<OrderBookData> {
    return new Promise((resolve, reject) => {
        const ws = new WebSocket(process.env.WS_URL as string);

        ws.on('open', () => {
            console.log('WebSocket connection established');
        });

        ws.on('message', (data: OrderBookData) => {
            const orderBookData: OrderBookData = JSON.parse(data.toString());
            resolve(orderBookData);
        });

        ws.on('error', (error: string) => {
            reject(error);
        });

        ws.on('close', () => {
            console.log('WebSocket connection closed');
        });
    });
}
