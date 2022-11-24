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
        link: '/services/all-services',
        roles: [],
    },
    {
        id: 'Servicios-activos',
        title: 'Servicios Activos',
        type: 'basic',
        icon: 'heroicons_outline:globe',
        link: '/services/actives',
        roles: [],
    },
    {
        id: 'Billetera',
        title: 'Billetera',
        type: 'basic',
        icon: 'heroicons_outline:credit-card',
        link: '/billetera',
        roles: [],
    },
    {
        id: 'Promociones',
        title: 'Promociones',
        subtitle: 'Cupones',
        type: 'basic',
        icon: 'heroicons_outline:newspaper',
        link: '/promociones-bonos',
        roles: [],
    },
    {
        id: 'Cargue-Masivo',
        title: 'Cargue Masivo',
        subtitle: 'Servicios',
        type: 'basic',
        icon: 'heroicons_outline:cloud-upload',
        link: '/cargue-masivo',
        roles: [],
    },
    {
        id: 'Ajustes del sistema',
        title: 'Ajustes del Sistema',
        subtitle: '',
        type: 'basic',
        icon: 'heroicons_outline:cog',
        link: '/ajustes-sistema',
        roles: [],
    },
    {
        id: 'reportes',
        title: 'Reportes',
        subtitle: '',
        type: 'basic',
        icon: 'heroicons_outline:document-report',
        link: '/reportes',
        roles: [],
    },
];


export const compactNavigation: FuseNavigationItem[] = [];
export const futuristicNavigation: FuseNavigationItem[] = [];
export const horizontalNavigation: FuseNavigationItem[] = [];
