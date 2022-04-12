import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home',        component: HomeComponent, canActivate: [AuthGuard] },
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
