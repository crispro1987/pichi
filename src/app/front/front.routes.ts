import { Routes } from "@angular/router";
import { FrontComponent } from "./front.component";

export const FRONT_ROUTES: Routes = [
    { 
        path: '', children: [
            { path: 'inicio', component: FrontComponent },
            { path: '', redirectTo: 'inicio', pathMatch: 'full' },
        ]
    }   
];