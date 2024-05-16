import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListFamillyComponent } from './Contrat/Familly/list-familly/list-familly.component';
import { AddFamillyComponent } from './Contrat/Familly/add-familly/add-familly.component';
import { ListAdministratorComponent } from './Contrat/Administrator/list-administrator/list-administrator.component';
import { AddAdministratorComponent } from './Contrat/Administrator/add-administrator/add-administrator.component';
import {ListClientComponent} from './Contrat/Client/list-client/list-client.component';
import { AddClientComponent } from './Contrat/Client/add-client/add-client.component';
import { ListExpertComponent } from './Contrat/Expert/list-expert/list-expert.component';
import { AddExpertComponent } from './Contrat/Expert/add-expert/add-expert.component';
import { AddDirecteurComponent } from './Contrat/Directeur/add-directeur/add-directeur.component';
import { ListDirecteurComponent } from './Contrat/Directeur/list-directeur/list-directeur.component';

const routes: Routes = [
  {path: 'famillies', component: ListFamillyComponent},
  {path: 'familly', component: AddFamillyComponent},
  {path: 'listAdmin', component: ListAdministratorComponent},
  {path: 'createAdmin', component: AddAdministratorComponent},
  {path: 'listeClient', component: ListClientComponent},
  {path: 'createClient', component: AddClientComponent},
  {path: 'listExpert', component: ListExpertComponent},
  {path: 'createExpert', component: AddExpertComponent},
  {path: 'createDirector', component: AddDirecteurComponent},
  {path: 'listDirecteur', component: ListDirecteurComponent},
  {path: '', redirectTo: 'famillies', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
