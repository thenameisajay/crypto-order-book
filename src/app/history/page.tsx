'use client';

import { api } from '~/trpc/react';

export default function Page() {
    const { data: storageOrderBookData } =
        api.orderBook.getStorageOrderBookData.useQuery();

    console.log('storageOrderBookData', storageOrderBookData);

    return (
        <div>
            <h1>Hisotry</h1>
        </div>
    );
}
