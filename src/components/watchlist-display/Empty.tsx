import React from 'react';

import { WarningDiamond } from '@phosphor-icons/react';

import { Card } from '~/components/ui/card';

export default function EmptyWatchList() {
    const emptyMessage =
        'Your watchlist is empty. Add a token to your watchlist to get started.';

    return (
        <div className="4  md:bottom-50 absolute  bottom-10 flex w-full flex-col items-center justify-center  sm:bottom-44">
            <Card className="mx-4 flex flex-col items-center justify-center">
                <div className="mx-auto flex flex-col items-center px-4 py-3 text-center">
                    <WarningDiamond
                        size={75}
                        className="m-2"
                        weight="bold"
                        color="#ec0909"
                    />
                    <h3 className="text-base font-semibold  text-red-500 md:text-2xl">
                        {emptyMessage}
                    </h3>
                </div>
            </Card>
        </div>
    );
}
