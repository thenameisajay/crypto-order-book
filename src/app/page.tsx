'use client';

import React from 'react';

import { api } from '~/trpc/react';
import type { OrderBookData } from '~/types/interfaces/orderBookData';

import ErrorDisplay from '~/components/error-display/ErrorDisplay';
import HeadBanner from '~/components/head-banner/HeadBanner';
import LoadingDisplay from '~/components/loading-display/LoadingDisplay';
import DuoTable from '~/components/order-table/DuoTable';

const heading: string = 'Unlock the Power of Crypto Order Book Data';

const description: string =
    'Dive into the real-time order book dynamics of your favorite cryptocurrencies. Our intuitive interface lets you seamlessly track and analyze market trends, empowering your trading decisions.';
/**
 * The `Home` component is the main entry point of the application, displaying the order book data for cryptocurrencies.
 *
 * This component uses the `tRPC` API to fetch the order book data and renders it using the `DuoTable` component. If the data is not available or there is an error, it displays appropriate loading or error messages.
 *
 * The component also includes a `HeadBanner` component that displays a heading and description for the page.
 *
 * @returns {JSX.Element} The rendered `Home` component.
 
 */
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
                <DuoTable
                    orderBookData={(orderBookData as OrderBookData[]) || []}
                    refetch={refetch}
                    showDetails={true}
                />
            ) : (
                <ErrorDisplay refetch={refetch} />
            )}
        </>
    );
}
