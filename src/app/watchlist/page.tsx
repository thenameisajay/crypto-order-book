import React from 'react';

import HeadBanner from '~/components/head-banner/HeadBanner';

const heading: string = 'Watchlist';

const description: string =
    'Curate your personalized crypto portfolio and stay updated on cryptocurrency market trends.';

export default function Page() {
    return (
        <div>
            <HeadBanner heading={heading} description={description} />
            <div className="flex flex-col items-center justify-center">
                <h1 className="mt-10 text-4xl font-bold">Coming Soon...</h1>
            </div>
        </div>
    );
}
