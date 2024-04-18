import { Toaster } from 'react-hot-toast';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import '~/styles/globals.css';
import { TRPCReactProvider } from '~/trpc/react';

import DevelopmentBanner from '~/components/banner/DBanner';
import DesktopNav from '~/components/nav-bar/DesktopNav';
import MobileNav from '~/components/nav-bar/MobileNav';
import { siteConfig } from '~/data/site/site';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: siteConfig.title,
    applicationName: siteConfig.title,

    description: siteConfig.description,
    keywords: siteConfig.keywords,

    creator: 'thenameisajay - https://github.com/thenameisajay',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link
                    rel="icon"
                    href="/icon?<generated>"
                    type="image/<generated>"
                    sizes="<generated>"
                />
                <link
                    rel="apple-touch-icon"
                    href="/apple-icon?<generated>"
                    type="image/<generated>"
                    sizes="<generated>"
                />
            </head>

            <body className={`font-sans ${inter.className}`}>
                <Toaster />
                <DevelopmentBanner />
                <DesktopNav />
                <MobileNav />
                <TRPCReactProvider>
                    {children}
                    <ReactQueryDevtools initialIsOpen={false} />
                </TRPCReactProvider>
            </body>
        </html>
    );
}
