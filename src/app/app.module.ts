import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListContratComponent } from './Contrat/Familly/list-contrat/list-contrat.component';
import { AddContratComponent } from './Contrat/Familly/add-contrat/add-contrat.component';
import { FormsModule } from '@angular/forms';
import { ListAdministratorComponent } from './Contrat/Administrator/list-administrator/list-administrator.component';
import { AddAdministratorComponent } from './Contrat/Administrator/add-administrator/add-administrator.component';


@NgModule({
  declarations: [
    AppComponent,
    ListContratComponent,
    AddContratComponent,
    ListAdministratorComponent,
    AddAdministratorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, 
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
