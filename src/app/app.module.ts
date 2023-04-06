import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';


import {MaterialModule} from './material/material.module';
import { MenuComponent } from './menu/menu.component';
import { PartituresComponent } from './partitures/partitures.component';
import { AddPartituraComponent } from './add-partitura/add-partitura.component'
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';

import { httpInterceptorProviders } from './_helpers/auth.interceptor';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { RegisterComponent } from './register/register.component';
import { ResetEmailComponent } from './reset-email/reset-email.component';

import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    MenuComponent,
    PartituresComponent,
    AddPartituraComponent,
    LoginComponent,
    RegisterComponent,
    ResetEmailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    provideAuth(() => getAuth())
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
