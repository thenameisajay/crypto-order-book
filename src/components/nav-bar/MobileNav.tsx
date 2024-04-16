'use client';

import { useState } from 'react';

import type { LinkProps } from 'next/link';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { Books, GithubLogo, List } from '@phosphor-icons/react';
import { Button } from '~/components/ui/button';
import { ScrollArea } from '~/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '~/components/ui/sheet';
import { navConfig } from '~/data/navBar/navBar';
import { siteConfig } from '~/data/site/site';
import { cn } from '~/lib/utils';

const { homeNav } = navConfig;

const gitRepo = 'https://github.com/thenameisajay/order-book';

export default function MobileNav() {
    const pathname = usePathname();

    const [open, setOpen] = useState(false);

    console.log('pathname', pathname);

    const redirectToGithub = () => {
        window.location.href = gitRepo;
    };

    return (
        <div className="mb-2  flex w-full flex-col items-start justify-start border-b  border-stone-950 p-1 focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button
                        variant="ghost"
                        className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                    >
                        <List size={32} weight="bold" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="pr-0">
                    <MobileLink
                        href={'/'}
                        className="flex items-center"
                        onOpenChange={setOpen}
                    >
                        <Books size={22} weight="bold" className="mr-2" />
                        <span className="font-bold">{siteConfig.title}</span>
                    </MobileLink>
                    <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                        <div className="flex flex-col space-y-3">
                            {homeNav.map(
                                (item) =>
                                    item.href && (
                                        <MobileLink
                                            key={item.href}
                                            href={item.href}
                                            onOpenChange={setOpen}
                                        >
                                            {item.title}
                                        </MobileLink>
                                    ),
                            )}
                            <div className="absolute bottom-0  ">
                                {
                                    <Button
                                        onClick={redirectToGithub}
                                        className="flex bg-[#105a37]   text-base font-semibold text-white hover:bg-black"
                                    >
                                        <GithubLogo
                                            size={32}
                                            className="mx-1 p-1"
                                        />
                                        GitHub
                                    </Button>
                                }
                            </div>
                        </div>
                    </ScrollArea>
                </SheetContent>
            </Sheet>
        </div>
    );
}

interface MobileLinkProps extends LinkProps {
    onOpenChange?: (open: boolean) => void;
    children: React.ReactNode;
    className?: string;
}

function MobileLink({
    href,
    onOpenChange,
    className,
    children,
    ...props
}: MobileLinkProps) {
    const router = useRouter();
    return (
        <Link
            href={href}
            onClick={() => {
                router.push(href.toString());
                onOpenChange?.(false);
            }}
            className={cn(className)}
            {...props}
        >
            {children}
        </Link>
    );
}
