import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { PartituresComponent } from './partitures/partitures.component';
import { AddPartituraComponent } from './add-partitura/add-partitura.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { AuthGuard } from './guards/auth.guard';
import { MenuComponent } from './menu/menu.component';
import { ResetEmailComponent } from './reset-email/reset-email.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', component:InicioComponent, canActivate: [AuthGuard]},
  {path: 'inicio', component:InicioComponent, canActivate: [AuthGuard]},
  { path: 'partitures', component: PartituresComponent, canActivate: [AuthGuard] },
  { path:'AddPartitures', component:AddPartituraComponent, canActivate: [AuthGuard]},
  { path:'login', component: LoginComponent, canActivate: [AuthGuard]},
  { path:'register', component: RegisterComponent, canActivate: [AuthGuard]},
  { path:'reset-email', component:ResetEmailComponent, canActivate: [AuthGuard]},
  { path:'menu', component: MenuComponent, canActivate: [AuthGuard]},
  {path:'**', redirectTo:'inicio', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
