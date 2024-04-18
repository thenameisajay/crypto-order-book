'use client';

import React from 'react';

import { usePathname } from 'next/navigation';

export default function Page() {
    const pathname = usePathname();

    const searchTerm = `${pathname.split('/')[1]}/USD`;

    console.log(searchTerm);

    return (
        <div>
            <h1>Page {searchTerm}</h1>
        </div>
    );
}
