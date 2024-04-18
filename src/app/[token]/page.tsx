'use client';

import React from 'react';
import toast from 'react-hot-toast';

import { usePathname } from 'next/navigation';

import { Binoculars, Trash } from '@phosphor-icons/react';
import { useLocalStorage } from 'usehooks-ts';
import { api } from '~/trpc/react';
import { type OrderBookData } from '~/types/interfaces/orderBookData';

import ErrorDisplay from '~/components/error-display/ErrorDisplay';
import HeadBanner from '~/components/head-banner/HeadBanner';
import LoadingDisplay from '~/components/loading-display/LoadingDisplay';
import DesktopTable from '~/components/order-table/DesktopTable';
import MobileTable from '~/components/order-table/MobileTable';
import { Button } from '~/components/ui/button';
import { getTokenDescription } from '~/data/token/tokenData';

export default function Page() {
    const [watchlist, setWatchlist] = useLocalStorage<string[]>(
        'userSelectedWatchList',
        [],
    );

    const pathname = usePathname();

    const utils = api.useUtils();

    const searchTerm = `${pathname.split('/')[1]}/USD`;

    const description =
        getTokenDescription(searchTerm) || 'No description found';

    const {
        data: liveData,
        refetch: latestDataRefetch,
        isError: isLiveError,
    } = api.orderBook.getOrderBook.useQuery(undefined, {
        refetchInterval: 500,
    });

    const { data: historyData, isError: isHistoryError } =
        api.orderBook.getOrderBookDataByToken.useQuery(
            { token: searchTerm },
            {
                refetchInterval: 510,
            },
        );

    const latestHistoryData = historyData?.[0] ? [historyData[0]] : [];

    const searchTokenLatestData = liveData
        ? (liveData.filter(
              (data) => data.coin === searchTerm,
          ) as OrderBookData[])
        : latestHistoryData;

    const isInWatchlist = watchlist.includes(searchTerm);

    const isValid = !isHistoryError || historyData;

    const handleWatchlistAction = () => {
        if (isInWatchlist) {
            setWatchlist(watchlist.filter((item) => item !== searchTerm));
            toast.success('Removed from watchlist');
        } else {
            setWatchlist([...watchlist, searchTerm]);
            toast.success('Added to watchlist');
        }
    };

    const handleRefresh = async () => {
        await latestDataRefetch();
        await utils.orderBook.getStorageOrderBookData.invalidate();
    };

    if (!historyData) {
        return (
            <>
                <HeadBanner heading={searchTerm} description={description} />
                <LoadingDisplay />
            </>
        );
    }

    const LocalBanner = () => {
        return (
            <div className="flex w-full flex-col items-center justify-center ">
                <HeadBanner heading={searchTerm} description={description} />
                <Button
                    className="mt-4 flex  w-44 justify-center  rounded-full bg-green-500 text-white hover:bg-green-900 md:mt-6 md:w-52"
                    disabled={!isValid}
                    onClick={handleWatchlistAction}
                >
                    {isInWatchlist ? (
                        <>
                            <Trash size={32} className="mx-2" weight="bold" />
                            <span className="text-sm font-medium  md:text-base">
                                {' '}
                                Remove
                            </span>
                        </>
                    ) : (
                        <>
                            <Binoculars
                                size={32}
                                className="mx-2"
                                weight="bold"
                            />
                            <span className="text-sm font-medium  md:text-base">
                                {' '}
                                Add to watchlist
                            </span>
                        </>
                    )}
                </Button>
            </div>
        );
    };

    return (
        <>
            <LocalBanner />
            {!isLiveError ? (
                <>
                    <div className="   -mb-6 flex w-full justify-center">
                        <div className="mt-4 flex justify-center">
                            <span className=" text-3xl font-bold md:text-5xl">
                                Live Data
                            </span>
                        </div>
                    </div>
                    <DesktopTable
                        showDetails={false}
                        showHistory={false}
                        showRefresh={true}
                        tableStyleProps={' w-11/12  mx-auto'}
                        orderBookData={searchTokenLatestData}
                        refetch={handleRefresh}
                    />
                    <MobileTable
                        showDetails={false}
                        orderBookData={searchTokenLatestData}
                        refetch={handleRefresh}
                    />
                </>
            ) : null}

            {!isHistoryError ? (
                <>
                    <div className="   -mb-6 flex w-full justify-center">
                        <div className="mt-4 flex justify-center">
                            <span className=" text-3xl font-bold md:text-5xl">
                                History
                            </span>
                        </div>
                    </div>
                    <DesktopTable
                        showDetails={false}
                        showHistory={false}
                        showRefresh={true}
                        tableStyleProps={' w-11/12  mx-auto'}
                        orderBookData={historyData || []}
                        refetch={handleRefresh}
                    />
                    <MobileTable
                        showDetails={false}
                        orderBookData={historyData || []}
                        refetch={handleRefresh}
                    />
                </>
            ) : (
                <ErrorDisplay refetch={handleRefresh} />
            )}
        </>
    );
}
