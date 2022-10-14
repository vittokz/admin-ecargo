/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'home',
        title: 'Inicio',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/home',
        roles: [],
    },
    {
        id: 'usuarios',
        title: 'Usuarios',
        type: 'basic',
        icon: 'heroicons_outline:user',
        link: '/user',
        roles: [],
    },
    {
        id: 'Conductores',
        title: 'Conductores',
        type: 'basic',
        icon: 'heroicons_outline:user-circle',
        link: '/driver',
        roles: [],
    },
    {
        id: 'Servicios',
        title: 'Servicios',
        type: 'basic',
        icon: 'heroicons_outline:database',
        link: '/services',
        roles: [],
    },
];

export const compactNavigation: FuseNavigationItem[] = [];
export const futuristicNavigation: FuseNavigationItem[] = [];
export const horizontalNavigation: FuseNavigationItem[] = [];
