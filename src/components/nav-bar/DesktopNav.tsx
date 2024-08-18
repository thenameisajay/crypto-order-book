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
        <div className="hidden h-16 w-full items-center border-b  border-stone-950 px-4 dark:border-yellow-50  md:flex md:py-2 ">
            <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-start ">
                <Link
                    href="/"
                    className="flex flex-1 items-center hover:cursor-pointer "
                >
                    <Books className="mr-2 h-8 w-8 text-green-900" />
                    <span className="px-4 font-bold text-green-900 md:py-2 md:text-base lg:text-2xl">
                        Order Book
                    </span>
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
                    </Button>
                }
            </div>
        </div>
    );
}
