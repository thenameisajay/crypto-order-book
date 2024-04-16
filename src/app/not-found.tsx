'use client';

import Link from 'next/link';

import { SmileyXEyes } from '@phosphor-icons/react';
import { Button } from '~/components/ui/button';

export default function NotFoundComponent() {
    return (
        <div className="flex min-h-[100vh] flex-col items-center justify-center space-y-4 text-[#105a37]">
            <div className="space-y-2 text-center">
                <SmileyXEyes
                    size={90}
                    className="inline-block text-[#105a37] "
                    weight="fill"
                />

                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                        Not Found
                    </h1>
                    <p className="mx-auto max-w-[600px] text-black dark:text-gray-400 md:text-xl/relaxed">
                        The page you were looking for is gone, and no one knows
                        where it is.
                    </p>
                </div>
            </div>
            <Link href="/">
                <Button variant="outline" className="text-base font-semibold">
                    Home
                </Button>
            </Link>
        </div>
    );
}
