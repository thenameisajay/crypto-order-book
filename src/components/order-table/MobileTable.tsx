import Link from 'next/link';

import { Link as LinkIcon } from '@phosphor-icons/react';
import { Table, Tag } from 'antd';
// import { orderBookData } from '~/data/fakeData/fakeData';
import type { OrderBookData } from '~/types/interfaces/orderBookData';
import { getLastUpdatedTime } from '~/utils/lastUpdated';
import { getLocaleTime } from '~/utils/localeTime';

import { Button } from '~/components/ui/button';

//TODO : There is a duplicate key error in the table. Fix it later

export default function DesktopTable({
    tableStyleProps,
    orderBookData,
    refetch,
}: {
    tableStyleProps?: string;
    orderBookData: OrderBookData[];
    refetch: () => void;
}) {
    return (
        <div className="mt-10 w-full flex-col items-center justify-center overflow-x-clip  lg:hidden">
            {
                <Table
                    className={`overflow-x-scroll ${tableStyleProps} `}
                    size="small"
                    columns={[
                        {
                            title: 'Time Stamp',
                            dataIndex: 'timestamp',

                            render: (timestamp: number) =>
                                getLocaleTime(timestamp),
                            responsive: ['sm'],
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
                        },

                        {
                            title: 'Best Bid',
                            dataIndex: 'bids',

                            render: (bids: [number, number][]) => (
                                <Tag color="green">{bids[0]?.[0] ?? ''}</Tag>
                            ),
                            responsive: ['sm'],
                        },
                        {
                            title: 'Best Ask',
                            dataIndex: 'asks',

                            render: (asks: [number, number][]) => (
                                <Tag color="red">{asks[0]?.[0] ?? ''}</Tag>
                            ),
                            responsive: ['sm'],
                        },

                        {
                            title: 'Last Updated',
                            dataIndex: 'timestamp',

                            render: (timestamp: number) =>
                                getLastUpdatedTime(timestamp),
                        },
                        {
                            title: 'Details',
                            dataIndex: 'details',

                            render: () => (
                                <Button className="bg-[#105a37]   text-base font-semibold text-white hover:bg-black">
                                    <LinkIcon size={17} />
                                </Button>
                            ),
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
                <Link href="/history">
                    <Button
                        variant={'secondary'}
                        className="mx-2 bg-[#105a37]   text-base font-semibold text-white hover:bg-black"
                    >
                        History
                    </Button>
                </Link>
            </div>
        </div>
    );
}
