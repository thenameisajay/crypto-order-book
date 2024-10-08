import type { NavItem } from '~/types/interfaces/Nav';

interface navConfig {
    homeNav: NavItem[];
}

export const navConfig: navConfig = {
    homeNav: [
        {
            title: 'Home',
            href: '/',
        },
        {
            title: 'Ticker',
            href: '/ticker',
        },
        {
            title: 'Watchlist',
            href: '/watchlist',
        },
    ],
};
