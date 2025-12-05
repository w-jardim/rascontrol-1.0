import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { authGuard } from './auth-guard';
import { ConfiguracaoValores } from './configuracao-valores/configuracao-valores';
import { Escala } from './escala/escala';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
  { path: 'configuracao-valores', component: ConfiguracaoValores, canActivate: [authGuard] },
  { path: 'escalas', component: Escala, canActivate: [authGuard] },
  { path: '**', redirectTo: '/login' }
];
