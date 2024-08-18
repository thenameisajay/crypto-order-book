'use client';

import { api } from '~/trpc/react';

import ErrorDisplay from '~/components/error-display/ErrorDisplay';
import HeadBanner from '~/components/head-banner/HeadBanner';
import LoadingDisplay from '~/components/loading-display/LoadingDisplay';
import DuoTable from '~/components/order-table/DuoTable';

const heading: string = 'Stock Ticker';

const description: string =
    'Monitor real-time updates and detailed analytics of stock market activity.';

/**
 * This is the main component for the Stock Ticker page.
 * It fetches and displays real-time updates and detailed analytics of stock market activity.
 */
export default function Page() {
    const utils = api.useUtils();

    const { refetch: latestDataRefetch } = api.orderBook.getOrderBook.useQuery(
        undefined,
        {
            refetchInterval: 500,
        },
    );

    const { data: storageOrderBookData, isError } =
        api.orderBook.getStorageOrderBookData.useQuery(undefined, {
            refetchInterval: 510,
        });

    if (!storageOrderBookData && !isError) {
        return (
            <>
                <HeadBanner heading={heading} description={description} />
                <LoadingDisplay />
            </>
        );
    }

    const handleRefresh = async () => {
        await latestDataRefetch();
        await utils.orderBook.getStorageOrderBookData.invalidate();
    };

    return (
        <>
            <HeadBanner heading={heading} description={description} />
            {!isError ? (
                <DuoTable
                    orderBookData={storageOrderBookData || []}
                    refetch={handleRefresh}
                    showDetails={true}
                />
            ) : (
                <ErrorDisplay refetch={handleRefresh} />
            )}
        </>
    );
}
