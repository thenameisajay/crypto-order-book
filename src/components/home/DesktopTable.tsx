import type { OrderBookData } from '~/types/interfaces/orderBookData';
import { getLastUpdatedTime } from '~/utils/lastUpdated';
import { getLocaleTime } from '~/utils/localeTime';

import { Card } from '~/components/ui/card';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '~/components/ui/table';
import { orderBookData } from '~/data/fakeData/fakeData';

export default function DesktopTable() {
    return (
        <div className="mt-10 flex w-full items-center justify-center">
            <Card className="flex flex-col items-center  justify-center p-6">
                <table className="table">
                    <thead className="my-2">
                        <tr className="mx-1">
                            <th>TimeStamp</th>
                            <th>Exchange</th>
                            <th>Coin</th>
                            <th>Bids</th>
                            <th>Asks</th>
                            <th>Best Bid</th>
                            <th>Best Ask</th>
                            <th> Details</th>
                            <th>Last Updated</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderBookData.map((data: OrderBookData, index) => {
                            const timeStamp = getLocaleTime(data.timestamp);
                            const lastUpdated = getLastUpdatedTime(
                                data.timestamp,
                            );
                            return (
                                <tr key={index}>
                                    <td>{timeStamp}</td>
                                    <td>{data.exchange}</td>
                                    <td>{data.coin}</td>
                                    <td>
                                        <ul>
                                            {data.bids.map((bid) => (
                                                <li key={bid[0]}>
                                                    {bid[0]} - {bid[1]}
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td>
                                        <ul>
                                            {data.asks.map((ask) => (
                                                <li key={ask[0]}>
                                                    {ask[0]} - {ask[1]}
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td>{data.bids[0][0]}</td>
                                    <td>{data.asks[0][0]}</td>
                                    <td>
                                        <button className="text-blue-500 underline">
                                            Details
                                        </button>
                                    </td>
                                    <td>{lastUpdated}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Card>
        </div>
    );
}
