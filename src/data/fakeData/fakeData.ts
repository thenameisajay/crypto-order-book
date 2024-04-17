import type { OrderBookData } from '~/types/interfaces/orderBookData';

export const orderBookData: OrderBookData[] = [
    {
        timestamp: 1713346968.426754,
        exchange: 'ExchangeX',
        coin: 'DOGE/USD',
        bids: [
            [0.0009, 3.2025],
            [0.0009, 2.8808],
            [0.0009, 6.1025],
            [0.0009, 6.7003],
            [0.0009, 8.9041],
        ],
        asks: [
            [0.001, 3.8377],
            [0.0011, 2.6975],
            [0.0011, 9.5951],
            [0.0011, 9.3029],
            [0.0011, 8.0121],
        ],
    },
];
