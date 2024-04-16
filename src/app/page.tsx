'use client';

import React from 'react';

import { api } from '~/trpc/react';

export default function Home() {
    const { data: orderBookData } = api.orderBook.getOrderBook.useQuery();

    console.log('Hello:', orderBookData);

    return (
        <>
            <h1>Home</h1>
        </>
    );
}
