import { Observable } from 'rxjs';
import { WebSocket } from 'ws';
import type { OrderBookData } from '~/types/interfaces/orderBookData';

export function connectToWebSocket(): Observable<OrderBookData> {
return new Observable((observer) => {
const ws = new WebSocket(process.env.WS_URL as string);

        ws.on('open', () => {
            console.log('WebSocket connection established');
        });

        ws.on('message', (data: OrderBookData) => {
            const orderBookData: OrderBookData = JSON.parse(data.toString());
            observer.next(orderBookData);
        });

        ws.on('error', (error: string) => {
            observer.error(error);
        });

        ws.on('close', () => {
            console.log('WebSocket connection closed');
            observer.complete();
        });

        // Return a cleanup function to close the WebSocket connection
        return () => {
            ws.close();
        };
    });

}
