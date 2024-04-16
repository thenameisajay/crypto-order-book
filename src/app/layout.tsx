import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import DesktopNav from '~/components/NavBar/DesktopNav';
import MobileNav from '~/components/NavBar/MobileNav';
import { siteConfig } from '~/data/site/site';
import '~/styles/globals.css';
import { TRPCReactProvider } from '~/trpc/react';

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
            <body className={`font-sans ${inter.className}`}>
                <DesktopNav />
                <MobileNav />
                <TRPCReactProvider>{children}</TRPCReactProvider>
            </body>
        </html>
    );
}
