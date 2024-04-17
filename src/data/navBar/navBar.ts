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
            title: 'History',
            href: '/history',
        },
        {
            title: 'Watchlist',
            href: '/watchlist',
        },
    ],
};
