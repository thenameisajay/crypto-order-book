'use client';

import React, { useEffect } from 'react';

import { XSquare } from '@phosphor-icons/react';
import dayjs from 'dayjs';
import { useLocalStorage } from 'usehooks-ts';

import { Button } from '~/components/ui/button';

// const devMessage = `This site is under development. Some features may not work as expected.`;

const demoMessage = `This is a demo version of a crypto platform. Do not make real trade decisions based on the data provided.`;

export default function DevelopmentBanner() {
    const [isDismissed, setIsDismissed] = useLocalStorage(
        'isDevelopmentBannerDismissed',
        false,
        {
            initializeWithValue: false,
        },
    );

    const [stateTime, setStateTime] = useLocalStorage(
        'developmentBannerDismissedTime',
        new Date().toISOString(),
        { initializeWithValue: false },
    );

    useEffect(() => {
        const nowTime = dayjs();

        if (
            isDismissed &&
            nowTime.diff(dayjs(stateTime as string), 'day') > 1
        ) {
            setIsDismissed(false);
            setStateTime(nowTime.toISOString());
        }
    }, [isDismissed, setIsDismissed, setStateTime, stateTime]);

    const handleDismiss = () => {
        setIsDismissed(true);
        setStateTime(dayjs().toISOString()); // Set the time when the user dismisses the banner
    };

    if (isDismissed) return <></>;

    return (
        <div className="flex items-center justify-evenly border-b  border-stone-950 ">
            <div className="flex w-full  items-center justify-center p-3 text-center md:p-4">
                <div className="">
                    <p className="text-center text-xs font-medium md:text-base">
                        {demoMessage}
                    </p>
                </div>
            </div>
            <div className="mx-2 flex items-center">
                <Button
                    variant="ghost"
                    className="flex items-center"
                    onClick={handleDismiss}
                >
                    <XSquare size={32} />
                </Button>
            </div>
        </div>
    );
}
