'use client';

import { api } from '~/trpc/react';

import ErrorDisplay from '~/components/error-display/ErrorDisplay';
import HeadBanner from '~/components/head-banner/HeadBanner';
import LoadingDisplay from '~/components/loading-display/LoadingDisplay';
import DesktopTable from '~/components/order-table/DesktopTable';
import MobileTable from '~/components/order-table/MobileTable';

const heading: string = 'History';

const description: string =
    'Explore a comprehensive record of order book data meticulously stored in our database. ';

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

    if (!storageOrderBookData) {
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
                <>
                    <DesktopTable
                        tableStyleProps={' w-11/12  mx-auto'}
                        orderBookData={storageOrderBookData || []}
                        refetch={handleRefresh}
                    />
                    <MobileTable
                        orderBookData={storageOrderBookData || []}
                        refetch={handleRefresh}
                    />
                </>
            ) : (
                <ErrorDisplay refetch={handleRefresh} />
            )}
        </>
    );
}
