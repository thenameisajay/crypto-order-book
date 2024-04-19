'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';

import { X } from '@phosphor-icons/react';
import { useLocalStorage } from 'usehooks-ts';
import { api } from '~/trpc/react';
import { type OrderBookData } from '~/types/interfaces/orderBookData';

import ErrorDisplay from '~/components/error-display/ErrorDisplay';
import HeadBanner from '~/components/head-banner/HeadBanner';
import LoadingDisplay from '~/components/loading-display/LoadingDisplay';
import DuoTable from '~/components/order-table/DuoTable';
import { Button } from '~/components/ui/button';
import EmptyWatchList from '~/components/watchlist-display/Empty';

const heading: string = 'Watchlist';
const description: string =
    'Curate your personalized crypto portfolio and stay updated on cryptocurrency market trends.';

export default function Page() {
    const [watchlist, setWatchlist, removeValue] = useLocalStorage(
        'userSelectedWatchList',
        [''],
    );

    // This is condition is due to the hook setting the initial value to [''] and the length of the array is 1 (Weird implementation)
    const isEmpty =
        (watchlist.length === 1 && watchlist[0] === '') ||
        watchlist.length === 0;

    console.log('Watch List', watchlist);

    console.log('Watch List is Empty', isEmpty);

    const [clearedWatchlist, setClearedWatchlist] = useState(isEmpty);

    console.log('Cleared Watch List', clearedWatchlist);

    const {
        data: latestLiveData,
        isError,
        refetch: handleRefresh,
    } = api.orderBook.getOrderBook.useQuery(undefined, {
        refetchInterval: 500,
    });

    const liveBTC = latestLiveData
        ? (latestLiveData.filter(
              (data) => data.coin === 'BTC/USD',
          ) as OrderBookData[])
        : [];

    const liveETH = latestLiveData
        ? (latestLiveData.filter(
              (data) => data.coin === 'ETH/USD',
          ) as OrderBookData[])
        : [];

    const liveDOGE = latestLiveData
        ? (latestLiveData.filter(
              (data) => data.coin === 'DOGE/USD',
          ) as OrderBookData[])
        : [];

    const liveXRP = latestLiveData
        ? (latestLiveData.filter(
              (data) => data.coin === 'XRP/USD',
          ) as OrderBookData[])
        : [];

    const liveLTC = latestLiveData
        ? (latestLiveData.filter(
              (data) => data.coin === 'LTC/USD',
          ) as OrderBookData[])
        : [];

    const showBTC = watchlist
        ? watchlist.includes('BTC/USD')
            ? true
            : false
        : false;
    const showETH = watchlist.includes('ETH/USD') ? true : false;
    const showDOGE = watchlist.includes('DOGE/USD') ? true : false;
    const showXRP = watchlist.includes('XRP/USD') ? true : false;
    const showLTC = watchlist.includes('LTC/USD') ? true : false;

    if (!latestLiveData && !isError) {
        return (
            <div>
                <HeadBanner heading={heading} description={description} />
                <LoadingDisplay />
            </div>
        );
    }

    const handleWatchlistAction = (searchTerm: string) => {
        if (watchlist.includes(searchTerm)) {
            const updatedWatchlist = watchlist.filter(
                (item) => item !== searchTerm,
            );
            setWatchlist(updatedWatchlist);
            toast.success('Removed from watchlist');
            if (updatedWatchlist.length === 0) {
                setClearedWatchlist(true);
            }
        }
    };

    const LocalBanner = () => {
        return (
            <div className="flex flex-col items-center">
                <HeadBanner heading={heading} description={description} />
                <div className=" flex w-44 items-center justify-center">
                    <Button
                        className="my-2 mb-5 flex flex-row bg-red-500 font-bold text-white  hover:bg-red-600 md:mt-6 md:text-base"
                        disabled={clearedWatchlist}
                        onClick={() => {
                            removeValue();
                            setClearedWatchlist(true);
                            toast.success('Watchlist cleared successfully');
                        }}
                    >
                        <X size={30} weight="bold" className="mx-2" />
                        <span>Clear Watchlist</span>
                    </Button>
                </div>
                {(isEmpty || clearedWatchlist) && <EmptyWatchList />}
            </div>
        );
    };

    return (
        <>
            <LocalBanner />
            {isError ? (
                <ErrorDisplay refetch={handleRefresh} />
            ) : (
                <>
                    {showBTC && (
                        <>
                            <div className=" -mb-4 w-full flex-col items-center">
                                <div className="mt-4 flex items-center justify-center">
                                    <span className=" text-xl font-bold md:text-5xl">
                                        BTC/USD (Live)
                                    </span>
                                    <Button
                                        className="mx-2  mt-2  h-10 w-16 rounded-full bg-black p-2  font-bold text-white hover:bg-red-500 "
                                        onClick={() =>
                                            handleWatchlistAction('BTC/USD')
                                        }
                                    >
                                        <X
                                            size={30}
                                            weight="bold"
                                            className="mx-2"
                                        />
                                    </Button>
                                </div>
                            </div>
                            <DuoTable
                                orderBookData={liveBTC}
                                refetch={handleRefresh}
                                showDetails={true}
                                tableStyleProps={' w-11/12  mx-auto'}
                            />
                        </>
                    )}
                    {showETH && (
                        <>
                            <div className=" -mb-4 w-full flex-col items-center">
                                <div className="mt-4 flex items-center justify-center">
                                    <span className=" text-xl font-bold md:text-5xl">
                                        ETH/USD (Live)
                                    </span>
                                    <Button
                                        className="mx-2  mt-2  h-10 w-16 rounded-full bg-black p-2  font-bold text-white hover:bg-red-500 "
                                        onClick={() =>
                                            handleWatchlistAction('ETH/USD')
                                        }
                                    >
                                        <X
                                            size={30}
                                            weight="bold"
                                            className="mx-2"
                                        />
                                    </Button>
                                </div>
                            </div>
                            <DuoTable
                                orderBookData={liveETH}
                                refetch={handleRefresh}
                                showDetails={true}
                                tableStyleProps={' w-11/12  mx-auto'}
                            />
                        </>
                    )}
                    {showDOGE && (
                        <>
                            <div className=" -mb-4 w-full flex-col items-center">
                                <div className="mt-4 flex items-center justify-center">
                                    <span className=" text-xl font-bold md:text-5xl">
                                        DOGE/USD (Live)
                                    </span>
                                    <Button
                                        className="mx-2  mt-2  h-10 w-16 rounded-full bg-black p-2  font-bold text-white hover:bg-red-500 "
                                        onClick={() =>
                                            handleWatchlistAction('DOGE/USD')
                                        }
                                    >
                                        <X
                                            size={30}
                                            weight="bold"
                                            className="mx-2"
                                        />
                                    </Button>
                                </div>
                            </div>
                            <DuoTable
                                orderBookData={liveDOGE}
                                refetch={handleRefresh}
                                showDetails={true}
                                tableStyleProps={' w-11/12  mx-auto'}
                            />
                        </>
                    )}
                    {showXRP && (
                        <>
                            <div className=" -mb-4 w-full flex-col items-center">
                                <div className="mt-4 flex items-center justify-center">
                                    <span className=" text-xl font-bold md:text-5xl">
                                        XRP/USD (Live)
                                    </span>
                                    <Button
                                        className="mx-2  mt-2  h-10 w-16 rounded-full bg-black p-2  font-bold text-white hover:bg-red-500 "
                                        onClick={() =>
                                            handleWatchlistAction('XRP/USD')
                                        }
                                    >
                                        <X
                                            size={30}
                                            weight="bold"
                                            className="mx-2"
                                        />
                                    </Button>
                                </div>
                            </div>
                            <DuoTable
                                orderBookData={liveXRP}
                                refetch={handleRefresh}
                                showDetails={true}
                                tableStyleProps={' w-11/12  mx-auto'}
                            />
                        </>
                    )}
                    {showLTC && (
                        <>
                            <div className=" -mb-4 w-full flex-col items-center">
                                <div className="mt-4 flex items-center justify-center">
                                    <span className=" text-xl font-bold md:text-5xl">
                                        LTC/USD (Live)
                                    </span>
                                    <Button
                                        className="mx-2  mt-2  h-10 w-16 rounded-full bg-black p-2  font-bold text-white hover:bg-red-500 "
                                        onClick={() =>
                                            handleWatchlistAction('LTC/USD')
                                        }
                                    >
                                        <X
                                            size={30}
                                            weight="bold"
                                            className="mx-2"
                                        />
                                    </Button>
                                </div>
                            </div>
                            <DuoTable
                                orderBookData={liveLTC}
                                refetch={handleRefresh}
                                showDetails={true}
                                tableStyleProps={' w-11/12  mx-auto'}
                            />
                        </>
                    )}
                </>
            )}
        </>
    );
}
