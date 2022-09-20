import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    // Admin routes
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
                (m) => m.HomeModule
            ),
    }
];
