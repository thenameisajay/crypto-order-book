import type { NavItem } from '~/types/interfaces/Nav';

interface navConfig {
    homeNav: NavItem[];
}

export const navConfig: navConfig = {
    homeNav: [
        {
            title: 'HOME',
            href: '/',
        },
        {
            title: 'ABOUT',
            href: '/about',
        },
        {
            title: 'Portfolio',
            href: '/portfolio',
        },
    ],
};
