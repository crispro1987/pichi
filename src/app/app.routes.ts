import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadChildren: () => import('./front/front.routes').then(m => m.FRONT_ROUTES) },
];
