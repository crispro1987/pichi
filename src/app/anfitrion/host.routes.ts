import { Routes } from "@angular/router";
import { AnfitrionComponent } from "./anfitrion.component";

export const HOST_ROUTES: Routes = [
    {
        path: '',
        children: [
            { path: '', component: AnfitrionComponent },
        ]
    }
];