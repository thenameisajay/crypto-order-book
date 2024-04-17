import { Table, Tag } from 'antd';
// import { orderBookData } from '~/data/fakeData/fakeData';
import type { OrderBookData } from '~/types/interfaces/orderBookData';
import { getLastUpdatedTime } from '~/utils/lastUpdated';
import { getLocaleTime } from '~/utils/localeTime';

export default function DesktopTable({
    orderBookData,
}: {
    orderBookData: OrderBookData[];
}) {
    return (
        <div className="mt-10 hidden w-full flex-col items-center justify-center lg:flex">
            {
                <Table
                    columns={[
                        {
                            title: 'Time Stamp',
                            dataIndex: 'timestamp',
                            key: 'timestamp',
                            render: (timestamp: number) =>
                                getLocaleTime(timestamp),
                        },
                        {
                            title: 'Exchange',
                            dataIndex: 'exchange',
                            key: 'exchange',
                        },
                        {
                            title: 'Coin',
                            dataIndex: 'coin',
                            key: 'coin',
                        },
                        {
                            title: 'Bids',
                            dataIndex: 'bids',
                            key: 'bids',
                            render: (bids: [number, number][]) => (
                                <ul className="text-base">
                                    {bids.map((bid) => (
                                        <li key={bid[0]}>
                                            {bid[0]} - {bid[1]}
                                        </li>
                                    ))}
                                </ul>
                            ),
                        },
                        {
                            title: 'Asks',
                            dataIndex: 'asks',
                            key: 'asks',
                            render: (asks: [number, number][]) => (
                                <ul className="text-base">
                                    {asks.map((ask) => (
                                        <li key={ask[0]}>
                                            {ask[0]} - {ask[1]}
                                        </li>
                                    ))}
                                </ul>
                            ),
                        },
                        {
                            title: 'Best Bid',
                            dataIndex: 'bids',
                            key: 'bestBid',
                            render: (bids: [number, number][]) => (
                                <Tag color="green">{bids[0]?.[0] ?? ''}</Tag>
                            ),
                        },
                        {
                            title: 'Best Ask',
                            dataIndex: 'asks',
                            key: 'bestAsk',
                            render: (asks: [number, number][]) => (
                                <Tag color="red">{asks[0]?.[0] ?? ''}</Tag>
                            ),
                        },
                        {
                            title: 'Details',
                            dataIndex: 'details',
                            key: 'details',
                            render: () => (
                                <button className="text-blue-500 underline">
                                    Details
                                </button>
                            ),
                        },
                        {
                            title: 'Last Updated',
                            dataIndex: 'timestamp',
                            key: 'lastUpdated',
                            render: (timestamp: number) =>
                                getLastUpdatedTime(timestamp),
                        },
                    ]}
                    dataSource={orderBookData}
                />
            }
            <div className="flex  w-60 flex-row p-2">
                <button className="text-blue-500 underline">Refresh</button>
                <button className="text-blue-500 underline">Portfolio</button>
            </div>
        </div>
    );
}

//   <table className="table">
//                     <thead className="my-2">
//                         <tr className="mx-1">
//                             <th>TimeStamp</th>
//                             <th>Exchange</th>
//                             <th>Coin</th>
//                             <th>Bids</th>
//                             <th>Asks</th>
//                             <th>Best Bid</th>
//                             <th>Best Ask</th>
//                             <th> Details</th>
//                             <th>Last Updated</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {orderBookData.map((data: OrderBookData, index) => {
//                             const timeStamp = getLocaleTime(data.timestamp);
//                             const lastUpdated = getLastUpdatedTime(
//                                 data.timestamp,
//                             );
//                             return (
//                                 <tr key={index}>
//                                     <td>{timeStamp}</td>
//                                     <td>{data.exchange}</td>
//                                     <td>{data.coin}</td>
//                                     <td>
//                                         <ul>
//                                             {data.bids.map((bid) => (
//                                                 <li key={bid[0]}>
//                                                     {bid[0]} - {bid[1]}
//                                                 </li>
//                                             ))}
//                                         </ul>
//                                     </td>
//                                     <td>
//                                         <ul>
//                                             {data.asks.map((ask) => (
//                                                 <li key={ask[0]}>
//                                                     {ask[0]} - {ask[1]}
//                                                 </li>
//                                             ))}
//                                         </ul>
//                                     </td>
//                                     <td>{data.bids[0][0]}</td>
//                                     <td>{data.asks[0][0]}</td>
//                                     <td>
//                                         <button className="text-blue-500 underline">
//                                             Details
//                                         </button>
//                                     </td>
//                                     <td>{lastUpdated}</td>
//                                 </tr>
//                             );
//                         })}
//                     </tbody>
//                 </table>
