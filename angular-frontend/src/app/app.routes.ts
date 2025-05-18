import { Routes } from '@angular/router';
import { LandingComponent } from './modules/landing/landing.component';
import { LoginComponent } from './modules/login/login.component';
import { AdminComponent } from './modules/admin/admin.component';


export const routes: Routes = [{ path:'', component:LandingComponent}
    ,{path:'login', component:LoginComponent},
    {path:'admin', component:AdminComponent}
    
];
