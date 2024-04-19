'use client';

import React from 'react';

import { api } from '~/trpc/react';
import type { OrderBookData } from '~/types/interfaces/orderBookData';

import ErrorDisplay from '~/components/error-display/ErrorDisplay';
import HeadBanner from '~/components/head-banner/HeadBanner';
import LoadingDisplay from '~/components/loading-display/LoadingDisplay';
import DesktopTable from '~/components/order-table/DesktopTable';
import MobileTable from '~/components/order-table/MobileTable';

const heading: string = 'Unlock the Power of Crypto Order Book Data';

const description: string =
    'Dive into the real-time order book dynamics of your favorite cryptocurrencies. Our intuitive interface lets you seamlessly track and analyze market trends, empowering your trading decisions.';

export default function Home() {
    const {
        data: orderBookData,
        refetch,
        isError,
    } = api.orderBook.getOrderBook.useQuery(undefined, {
        refetchInterval: 1,
    });

    console.log('orderBookData', orderBookData);

    if (!orderBookData && !isError) {
        return (
            <>
                <HeadBanner heading={heading} description={description} />
                <LoadingDisplay />
            </>
        );
    }

    return (
        <>
            <HeadBanner heading={heading} description={description} />
            {!isError ? (
                <>
                    <DesktopTable
                        showDetails={true}
                        orderBookData={(orderBookData as OrderBookData[]) || []}
                        refetch={refetch}
                    />
                    <MobileTable
                        showDetails={true}
                        orderBookData={(orderBookData as OrderBookData[]) || []}
                        refetch={refetch}
                    />
                </>
            ) : (
                <ErrorDisplay refetch={refetch} />
            )}
        </>
    );
}
