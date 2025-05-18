import { Routes } from '@angular/router';
import { LandingComponent } from './modules/landing/landing.component';
import { LoginComponent } from './modules/login/login.component';


export const routes: Routes = [{ path:'', component:LandingComponent}
    ,{path:'login', component:LoginComponent},
    
];
