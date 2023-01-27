import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { PartituresComponent } from './partitures/partitures.component';
import { AddPartituraComponent } from './add-partitura/add-partitura.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: '', component:LoginComponent},
  {path: 'inicio', component:InicioComponent},
  { path: 'partitures', component: PartituresComponent },
  { path:'AddPartitures', component:AddPartituraComponent},
  { path:'Login', component: LoginComponent},
  {path:'**', redirectTo:'Login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
