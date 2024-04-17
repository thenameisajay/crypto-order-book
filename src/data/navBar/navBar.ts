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
            title: 'Portfolio',
            href: '/portfolio',
        },
        {
            title: 'More',
            href: '/more',
        },
        {
            title: 'Watchlist',
            href: '/watchlist',
        },
    ],
};
