import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListContratComponent } from './Contrat/Familly/list-contrat/list-contrat.component';
import { AddContratComponent } from './Contrat/Familly/add-contrat/add-contrat.component';


@NgModule({
  declarations: [
    AppComponent,
    ListContratComponent,
    AddContratComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
