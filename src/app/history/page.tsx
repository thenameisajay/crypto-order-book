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

//TODO : invalidate the storage order book data query after the latest data is fetched
export default function Page() {
    const { refetch: latestDataRefetch } =
        api.orderBook.getOrderBook.useQuery();

    const { data: storageOrderBookData, isError } =
        api.orderBook.getStorageOrderBookData.useQuery();

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
        // await queryClient.invalidateQueries({
        //     queryKey: ['getStorageOrderBookData'],
        // });
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
