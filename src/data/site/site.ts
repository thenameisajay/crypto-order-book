export const siteConfig = {
    title: 'Order Book',
    url: 'order-book-one.vercel.app',
    description:
        'This is a real-time order book visualization application for cryptocurrency trading. It uses a WebSocket connection to fetch live order book data from a mock API and displays the top 5 bids and asks for the selected cryptocurrency and exchange. The application is built using Next.js and tRPC for a TypeScript-based, type-safe implementation.',
    links: {
        github: 'https://github.com/thenameisajay/order-book',
    },
    keywords: [
        'order book',
        'cryptocurrency',
        'trading',
        'real-time',
        'visualization',
        'next.js',
        'trpc',
        'typescript',
    ],
};

export type SiteConfig = typeof siteConfig;
