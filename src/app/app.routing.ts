import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    // Admin routes
    {
        path: 'login',
        canActivate: [],
        data: {
            roles: [],
        },
        loadChildren: () =>
            import('app/modules/auth/sign-in/sign-in.module').then(
                m => m.AuthSignInModule
            ),
    },
    {
        path: 'home',
        canActivate: [],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        data: {
            roles: [],
        },
        loadChildren: () =>
            import('app/modules/admin/home/home.module').then(
                m => m.HomeModule
            ),
    },
    {
        path: 'user',
        canActivate: [],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        data: {
            roles: [],
        },
        loadChildren: () =>
            import('app/modules/admin/user/user.module').then(
                m => m.UserModule
            ),
    },
    {
        path: 'driver',
        canActivate: [],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        data: {
            roles: [],
        },
        loadChildren: () =>
            import('app/modules/admin/driver/driver.module').then(
                m => m.DriverModule
            ),
    },
    {
        path: 'services',
        canActivate: [],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        data: {
            roles: [],
        },
        loadChildren: () =>
            import('app/modules/admin/services/services.module').then(
                m => m.ServicesModule
            ),
    },
    {
        path: 'billetera',
        canActivate: [],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        data: {
            roles: [],
        },
        loadChildren: () =>
            import('app/modules/admin/billetera/billetera.module').then(
                m => m.BilleteraModule
            ),
    },
    {
        path: 'promociones-bonos',
        canActivate: [],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        data: {
            roles: [],
        },
        loadChildren: () =>
            import('app/modules/admin/promociones-bonos/promociones-bonos.module').then(
                m => m.PromocionesBonosModule
            ),
    },
    {
        path: 'cargue-masivo',
        canActivate: [],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        data: {
            roles: [],
        },
        loadChildren: () =>
            import('app/modules/admin/cargue-masivo/cargue-masivo.module').then(
                m => m.CargueMasivoModule
            ),
    },
    {
        path: 'ajustes-sistema',
        canActivate: [],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        data: {
            roles: [],
        },
        loadChildren: () =>
            import('app/modules/admin/ajustes-sistema/ajustes-sistema.module').then(
                m => m.AjustesSistemaModule
            ),
    },
    {
        path: 'payment',
        canActivate: [],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        data: {
            roles: [],
        },
        loadChildren: () =>
            import('app/modules/admin/pagos/payments.module').then(
                m => m.PaymentsModule
            ),
    },
    {
        path: 'reportes',
        canActivate: [],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        data: {
            roles: [],
        },
        loadChildren: () =>
            import('app/modules/admin/reportes/reportes.module').then(
                m => m.ReportesModule
            ),
    }

];
