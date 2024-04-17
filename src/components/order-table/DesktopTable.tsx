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
                        },
                        {
                            title: 'Bids',
                            dataIndex: 'bids',
                            width: '20%',

                            render: (bids: [number, number][]) => (
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
                                            <span className="mx-2">@</span>
                                            <Tag
                                                color="blue"
                                                className=" w-20 text-center"
                                            >
                                                {bid[1]}
                                            </Tag>
                                        </li>
                                    ))}
                                </ul>
                            ),
                        },
                        {
                            title: 'Asks',
                            dataIndex: 'asks',
                            width: '20%',

                            render: (asks: [number, number][]) => (
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
                                            <span className="mx-2">@</span>
                                            <Tag
                                                color="blue"
                                                className=" w-20 text-center"
                                            >
                                                {ask[1]}
                                            </Tag>
                                        </li>
                                    ))}
                                </ul>
                            ),
                        },
                        {
                            title: 'Best Bid',
                            dataIndex: 'bids',
                            width: '5%',

                            render: (bids: [number, number][]) => (
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
                            ),
                        },
                        {
                            title: 'Best Ask',
                            dataIndex: 'asks',
                            width: '5%',
                            render: (asks: [number, number][]) => (
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
