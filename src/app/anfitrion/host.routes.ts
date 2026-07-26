import { Routes } from "@angular/router";
import { AnfitrionComponent } from "./anfitrion.component";
import { LoginHostComponent } from "./login-host/login-host.component";
import { authHostGuard } from "../shared/guards/auth-host.guard";
import { RegisterHostComponent } from "./register-host/register-host.component";

export const HOST_ROUTES: Routes = [
    {
        path: '',
        children: [
            { path: '', component: AnfitrionComponent, canActivate: [authHostGuard] },
            { path: 'login', component: LoginHostComponent },
            { path: 'registro', component: RegisterHostComponent },
        ]
    }
];