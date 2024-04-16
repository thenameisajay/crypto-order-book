'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { GithubLogo } from '@phosphor-icons/react';
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
        <div className="hidden h-16 w-full border-b border-stone-950    xl:block xl:py-10">
            <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between ">
                <div className="justify-start p-2 text-base font-bold  xl:text-3xl">
                    Logo
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
                            className="flex bg-[#105a37]   text-base font-semibold text-white hover:bg-black"
                        >
                            <GithubLogo size={32} className="mx-1 p-1" />
                            GITHUB
                        </Button>
                    }
                </div>
            </div>
        </div>
    );
}
