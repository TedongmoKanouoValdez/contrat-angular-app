import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListFamillyComponent } from './Contrat/Familly/list-familly/list-familly.component';
import { AddFamillyComponent } from './Contrat/Familly/add-familly/add-familly.component';
import { ListAdministratorComponent } from './Contrat/Administrator/list-administrator/list-administrator.component';
import { AddAdministratorComponent } from './Contrat/Administrator/add-administrator/add-administrator.component';
import {ListClientComponent} from './Contrat/Client/list-client/list-client.component';

const routes: Routes = [
  {path: 'famillies', component: ListFamillyComponent},
  {path: 'familly', component: AddFamillyComponent},
  {path: 'listAdmin', component: ListAdministratorComponent},
  {path: 'createAdmin', component: AddAdministratorComponent},
  {path: 'listeClient', component: ListClientComponent},
  {path: '', redirectTo: 'famillies', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
