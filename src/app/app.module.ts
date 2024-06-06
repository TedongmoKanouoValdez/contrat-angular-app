import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListFamillyComponent } from './Contrat/Familly/list-familly/list-familly.component';
import { AddFamillyComponent } from './Contrat/Familly/add-familly/add-familly.component';
import { FormsModule } from '@angular/forms';
import { ListAdministratorComponent } from './Contrat/Administrator/list-administrator/list-administrator.component';
import { AddAdministratorComponent } from './Contrat/Administrator/add-administrator/add-administrator.component';
import { AddClientComponent } from './Contrat/Client/add-client/add-client.component';
import { ListClientComponent } from './Contrat/Client/list-client/list-client.component';
import { ListExpertComponent } from './Contrat/Expert/list-expert/list-expert.component';
import { AddExpertComponent } from './Contrat/Expert/add-expert/add-expert.component';
import { ExpertDetailsComponent } from './Contrat/Expert/expert-details/expert-details.component';
import { AddDirecteurComponent } from './Contrat/Directeur/add-directeur/add-directeur.component';
import { ListDirecteurComponent } from './Contrat/Directeur/list-directeur/list-directeur.component';
import { SidenavComponent } from './Contrat/sidenav/sidenav.component';
import { DashboardComponent } from './Contrat/dashboard/dashboard.component';
import { BodyComponent } from './Contrat/body/body.component';


@NgModule({
  declarations: [
    AppComponent,
    ListFamillyComponent,
    AddFamillyComponent,
    ListAdministratorComponent,
    AddAdministratorComponent,
    AddClientComponent,
    ListClientComponent,
    ListExpertComponent,
    AddExpertComponent,
    ExpertDetailsComponent,
    AddDirecteurComponent,
    ListDirecteurComponent,
    SidenavComponent,
    DashboardComponent,
    BodyComponent
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
