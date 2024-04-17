import Link from 'next/link';

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
        <div className="mt-10 hidden w-full flex-col items-center justify-center lg:flex">
            {
                <Table
                    className={` ${tableStyleProps} `}
                    pagination={{ pageSize: 5, hideOnSinglePage: true }}
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
                        },
                        {
                            title: 'Bids',
                            dataIndex: 'bids',

                            render: (bids: [number, number][]) => (
                                <ul className="text-base">
                                    {bids.map((bid, index) => (
                                        <li key={`${bid[0]}-${index}`}>
                                            {bid[0]} - {bid[1]}
                                        </li>
                                    ))}
                                </ul>
                            ),
                        },
                        {
                            title: 'Asks',
                            dataIndex: 'asks',

                            render: (asks: [number, number][]) => (
                                <ul className="text-base">
                                    {asks.map((ask, index) => (
                                        <li key={`${ask[0]}-${index}`}>
                                            {ask[0]} - {ask[1]}
                                        </li>
                                    ))}
                                </ul>
                            ),
                        },
                        {
                            title: 'Best Bid',
                            dataIndex: 'bids',

                            render: (bids: [number, number][]) => (
                                <Tag color="green">{bids[0]?.[0] ?? ''}</Tag>
                            ),
                        },
                        {
                            title: 'Best Ask',
                            dataIndex: 'asks',

                            render: (asks: [number, number][]) => (
                                <Tag color="red">{asks[0]?.[0] ?? ''}</Tag>
                            ),
                        },
                        {
                            title: '',
                            dataIndex: 'details',

                            render: () => (
                                <Button className="bg-[#105a37]   text-base font-semibold text-white hover:bg-black">
                                    Details
                                </Button>
                            ),
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
