import { Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { authAdminGuard } from "../shared/guards/auth-admin.guard";
import { LoginAdminComponent } from "./login-admin/login-admin.component";

export const ADMIN_ROUTES: Routes = [
    {
        path: '',
        children: [
            { path: '', component: AdminComponent, canActivate: [authAdminGuard] },
            { path: 'login', component: LoginAdminComponent },
        ]
    }
];