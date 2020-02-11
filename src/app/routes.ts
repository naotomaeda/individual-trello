import { Routes } from '@angular/router';
import { LoginComponent } from './core/auth/login/login.component';

export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'redirect', component: LoginComponent },

  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },

  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
