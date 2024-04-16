export interface MockData {
    timestamp: 'float';
    exchange: 'string';
    coin: 'string';
    bids: [
        ['float', 'float'],
        ['float', 'float'],
        ['float', 'float'],
        ['float', 'float'],
        ['float', 'float'],
    ];
    asks: [
        ['float', 'float'],
        ['float', 'float'],
        ['float', 'float'],
        ['float', 'float'],
        ['float', 'float'],
    ];
}
