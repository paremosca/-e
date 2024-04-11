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

import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { RegisterComponent } from './register/register.component';
import { ResetEmailComponent } from './reset-email/reset-email.component';

import { RouterModule } from '@angular/router';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ListPartiturasComponent } from './list-partituras/list-partituras.component';
import { PoliticaComponent } from './politica/politica.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    MenuComponent,
    PartituresComponent,
    AddPartituraComponent,
    LoginComponent,
    RegisterComponent,
    ResetEmailComponent,
    ListPartiturasComponent,
    PoliticaComponent
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
    PdfViewerModule,
    Ng2SearchPipeModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
