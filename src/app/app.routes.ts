import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadChildren: () => import('./front/front.routes').then(m => m.FRONT_ROUTES) },
    { path: 'anfitrion', loadChildren: () => import('./anfitrion/host.routes').then(m => m.HOST_ROUTES) },
    { path: 'admin', loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES) },
];
