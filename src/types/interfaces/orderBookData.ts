export interface OrderBookData {
    timestamp: number;
    exchange: string;
    coin: string;
    bids: [
        [number, number],
        [number, number],
        [number, number],
        [number, number],
        [number, number],
    ];
    asks: [
        [number, number],
        [number, number],
        [number, number],
        [number, number],
        [number, number],
    ];
}
