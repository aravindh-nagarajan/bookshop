import { NgModule } from '@angular/core';
import {
  RouterModule, 
  Routes,
} from '@angular/router';
import { AuthGuard } from './auth-guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';

const appRoutes: Routes = [
  {
    path: 'login', 
    component: LoginComponent,
  },
  {
    path: 'dashboard',        
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: '/login', 
    pathMatch: 'full',
  },
  {
    path: '**', 
    component: LoginComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
