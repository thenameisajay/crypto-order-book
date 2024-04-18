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
            title: 'Stock Ticker',
            href: '/stock-ticker',
        },
        {
            title: 'Watchlist',
            href: '/watchlist',
        },
    ],
};
