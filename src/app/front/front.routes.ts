import { Routes } from "@angular/router";
import { FrontComponent } from "./front.component";
import { HospedajeComponent } from "./hospedaje/hospedaje.component";
import { EntornoComponent } from "./entorno/entorno.component";
import { EventosComponent } from "./eventos/eventos.component";
import { LegalComponent } from "./legal/legal.component";
import { HospedajesComponent } from "./hospedajes/hospedajes.component";

export const FRONT_ROUTES: Routes = [
    { 
        path: '', children: [
            { path: 'inicio', component: FrontComponent },
            { path: '', redirectTo: 'inicio', pathMatch: 'full' },
            { path: 'hospedaje/:id', component: HospedajeComponent },
            { path: 'hospedajes', component: HospedajesComponent },
            { path: 'entorno', component: EntornoComponent },
            { path: 'eventos', component: EventosComponent },
            { path: 'legal', component: LegalComponent },
            
        ]
    }   
];