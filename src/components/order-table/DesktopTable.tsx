import React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Table, Tag } from 'antd';
// import { orderBookData } from '~/data/fakeData/fakeData';
import type { OrderBookData } from '~/types/interfaces/orderBookData';
import { getLastUpdatedTime } from '~/utils/lastUpdated';
import { getLocaleTime } from '~/utils/localeTime';

import { Button } from '~/components/ui/button';

export default function DesktopTable({
    tableStyleProps,
    orderBookData,
    refetch,
    showDetails = true,

    showRefresh = true,
}: {
    tableStyleProps?: string;
    orderBookData: OrderBookData[];
    refetch: () => void;
    showDetails?: boolean;

    showRefresh?: boolean;
}) {
    const pathname = usePathname();
    const isonTickerPage: boolean = pathname === '/ticker';

    console.log('pathname', pathname);

    console.log('isonTickerPage', isonTickerPage);

    return (
        <div className="mt-10 hidden w-full flex-col items-center justify-center lg:flex">
            {
                <Table
                    size="small"
                    className={` ${tableStyleProps} `}
                    pagination={{ hideOnSinglePage: true, pageSize: 4 }}
                    columns={[
                        {
                            title: 'Time Stamp',
                            dataIndex: 'timestamp',

                            render: (timestamp: number) =>
                                getLocaleTime(timestamp),
                        },
                        {
                            title: 'Exchange',
                            dataIndex: 'exchange',
                        },
                        {
                            title: 'Coin',
                            dataIndex: 'coin',
                            width: '5%',
                            render: (coin: string) => (
                                <div className="text-base font-bold">
                                    {coin}
                                </div>
                            ),
                        },
                        {
                            title: 'Bids',
                            dataIndex: 'bids',
                            width: '20%',

                            render: (bids: [number, number][]) => {
                                return (
                                    <div className=" flex  flex-col items-center justify-center">
                                        <div className="flex  w-36 justify-between">
                                            <span className="text-base font-bold">
                                                QTY
                                            </span>
                                            <span className="text-base font-bold">
                                                Price
                                            </span>
                                        </div>
                                        <ul className="flex flex-col items-center justify-center text-center text-base">
                                            {bids.map((bid, index) => (
                                                <li
                                                    key={`${bid[0]}-${index}`}
                                                    className="my-1 flex items-center"
                                                >
                                                    <Tag
                                                        color="blue"
                                                        className=" w-20 text-center"
                                                    >
                                                        {bid[0]}
                                                    </Tag>
                                                    <span className="mx-2">
                                                        @
                                                    </span>
                                                    <Tag
                                                        color="blue"
                                                        className=" w-20 text-center"
                                                    >
                                                        {bid[1]}
                                                    </Tag>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                );
                            },
                        },
                        {
                            title: 'Asks',
                            dataIndex: 'asks',
                            width: '20%',

                            render: (asks: [number, number][]) => {
                                return (
                                    <div className=" flex  flex-col items-center justify-center">
                                        <div className="flex w-36 justify-between">
                                            <span className="text-base font-bold">
                                                QTY
                                            </span>
                                            <span className="text-base font-bold">
                                                Price
                                            </span>
                                        </div>
                                        <ul className="flex flex-col items-center justify-center text-center text-base">
                                            {asks.map((ask, index) => (
                                                <li
                                                    key={`${ask[0]}-${index}`}
                                                    className="my-1 flex items-center"
                                                >
                                                    <Tag
                                                        color="blue"
                                                        className=" w-20 text-center"
                                                    >
                                                        {ask[0]}
                                                    </Tag>
                                                    <span className="mx-2">
                                                        @
                                                    </span>
                                                    <Tag
                                                        color="blue"
                                                        className=" w-20 text-center"
                                                    >
                                                        {ask[1]}
                                                    </Tag>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                );
                            },
                        },
                        {
                            title: 'Best Bid',
                            dataIndex: 'bids',
                            width: '5%',

                            render: (bids: [number, number][]) => {
                                return (
                                    <div className=" flex  flex-col items-center justify-center">
                                        <div className="mb-2  flex w-36 justify-between">
                                            <span className="text-base font-bold">
                                                QTY
                                            </span>
                                            <span className="text-base font-bold">
                                                Price
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <Tag
                                                color="green"
                                                className=" w-20 text-center"
                                            >
                                                {bids[0]?.[0] ?? ''}
                                            </Tag>
                                            <span className="mx-2">@</span>
                                            <Tag
                                                color="green"
                                                className=" w-20 text-center"
                                            >
                                                {bids[0]?.[1] ?? ''}
                                            </Tag>
                                        </div>
                                    </div>
                                );
                            },
                        },
                        {
                            title: 'Best Ask',
                            dataIndex: 'asks',
                            width: '5%',
                            render: (asks: [number, number][]) => {
                                return (
                                    <div className=" flex  flex-col items-center justify-center">
                                        <div className="mb-2  flex w-36 justify-between">
                                            <span className="text-base font-bold">
                                                QTY
                                            </span>
                                            <span className="text-base font-bold">
                                                Price
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <Tag
                                                color="red"
                                                className=" w-20 text-center"
                                            >
                                                {asks[0]?.[0] ?? ''}
                                            </Tag>
                                            <span className="mx-2">@</span>
                                            <Tag
                                                color="red"
                                                className=" w-20 text-center"
                                            >
                                                {asks[0]?.[1] ?? ''}
                                            </Tag>
                                        </div>
                                    </div>
                                );
                            },
                        },
                        {
                            title: '',
                            dataIndex: 'coin',

                            render: (coin: string) => {
                                const hrefLink = `currency/${coin.split('/')[0]}`;
                                return (
                                    <>
                                        {showDetails && (
                                            <Link href={`/${hrefLink}`}>
                                                <Button className="bg-[#105a37]   text-base font-semibold text-white hover:bg-black">
                                                    Details
                                                </Button>
                                            </Link>
                                        )}
                                    </>
                                );
                            },
                        },
                        {
                            title: 'Last Updated',
                            dataIndex: 'timestamp',

                            render: (timestamp: number) =>
                                getLastUpdatedTime(timestamp),
                        },
                    ]}
                    dataSource={orderBookData}
                />
            }
            <div className="flex  w-60 flex-row p-2">
                {showRefresh && (
                    <Button
                        variant={'secondary'}
                        className="mx-2 bg-[#105a37]   text-base font-semibold text-white hover:bg-black"
                        onClick={refetch}
                    >
                        Refresh
                    </Button>
                )}
                {!isonTickerPage && (
                    <Link href="/ticker">
                        <Button
                            variant={'secondary'}
                            className="mx-2 bg-[#105a37]   text-base font-semibold text-white hover:bg-black"
                        >
                            Ticker
                        </Button>
                    </Link>
                )}
            </div>
        </div>
    );
}
