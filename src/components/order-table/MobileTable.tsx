import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Browsers } from '@phosphor-icons/react';
import { Table, Tag } from 'antd';
import type { OrderBookData } from '~/types/interfaces/orderBookData';
import { getLastUpdatedTime } from '~/utils/lastUpdated';
import { getLocaleTime } from '~/utils/localeTime';

import { Button } from '~/components/ui/button';

export default function MobileTable({
    showDetails = true,
    tableStyleProps,
    orderBookData,
    refetch,
}: {
    showDetails: boolean;
    tableStyleProps?: string;
    orderBookData: OrderBookData[];
    refetch: () => void;
}) {
    const pathname = usePathname();

    console.log('pathname', pathname);

    const isonTickerPage: boolean = pathname === '/ticker';

    return (
        <div className="mt-10 w-full flex-col items-center justify-center overflow-x-clip  lg:hidden">
            {
                <Table
                    className={`overflow-x-scroll ${tableStyleProps} `}
                    size="small"
                    pagination={{ hideOnSinglePage: true, pageSize: 4 }}
                    columns={[
                        {
                            title: 'Time Stamp',
                            dataIndex: 'timestamp',

                            render: (timestamp: number) =>
                                getLocaleTime(timestamp),

                            width: '10',
                        },
                        {
                            title: 'Exchange',
                            dataIndex: 'exchange',

                            width: '4',
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
                            title: 'Best Bid',
                            dataIndex: 'bids',

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
                            responsive: ['sm'],
                        },
                        {
                            title: 'Best Ask',
                            dataIndex: 'asks',

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
                            responsive: ['sm'],
                        },

                        {
                            title: 'Last Updated',
                            dataIndex: 'timestamp',
                            responsive: ['sm'],
                            render: (timestamp: number) =>
                                getLastUpdatedTime(timestamp),
                        },
                        {
                            title: 'Details',
                            dataIndex: 'coin',
                            render: (coin: string) => {
                                const hrefLink = `currency/${coin.split('/')[0]}`;
                                return (
                                    <>
                                        {showDetails && (
                                            <Link href={`/${hrefLink}`}>
                                                <Browsers size={17} />
                                            </Link>
                                        )}
                                    </>
                                );
                            },
                        },
                    ]}
                    dataSource={orderBookData}
                />
            }
            <div className="flex w-full flex-row items-center justify-center p-2">
                <Button
                    variant={'secondary'}
                    className="mx-2 bg-[#105a37]   text-base font-semibold text-white hover:bg-black"
                    onClick={refetch}
                >
                    Refresh
                </Button>
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
