'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Books, GithubLogo } from '@phosphor-icons/react';
import { Button } from '~/components/ui/button';
import { navConfig } from '~/data/navBar/navBar';

const { homeNav } = navConfig;

const gitRepo = 'https://github.com/thenameisajay/order-book';

export default function DesktopNav() {
    const pathname = usePathname();

    console.log('pathname', pathname);

    const redirectToGithub = () => {
        window.location.href = gitRepo;
    };

    return (
        <div className="hidden h-16 w-full items-center border-b  border-stone-950 md:flex  md:p-5 lg:p-10 ">
            <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-start ">
                <Link href="/">
                    <div className="flex items-center justify-start rounded bg-[#105a37]  text-base font-bold text-white lg:p-2  xl:text-3xl">
                        <Books size={45} className="mr-2" />
                        <span className="font-bold md:p-2 md:text-base lg:text-2xl">
                            Order Book
                        </span>
                    </div>
                </Link>
            </div>
            <div className="flex  items-center justify-end space-x-4   text-xl font-semibold">
                {homeNav.map((item, index) => (
                    <Link
                        key={index}
                        href={item.href ?? ''}
                        className={`px-2   font-normal hover:text-[#105a37]  ${
                            pathname === item.href ? 'text-[#105a37]' : ''
                        }`}
                    >
                        {item.title}
                    </Link>
                ))}
                {
                    <Button
                        onClick={redirectToGithub}
                        className="flex rounded-full bg-[#105a37]   text-base font-semibold text-white hover:bg-black"
                    >
                        <GithubLogo size={32} className="mx-1 p-1" />
                        GITHUB
                    </Button>
                }
            </div>
        </div>
    );
}
