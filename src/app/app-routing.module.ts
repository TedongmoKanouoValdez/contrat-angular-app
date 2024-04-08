import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListContratComponent } from './Contrat/Familly/list-contrat/list-contrat.component';
import { AddContratComponent } from './Contrat/Familly/add-contrat/add-contrat.component';
import { ListAdministratorComponent } from './Contrat/Administrator/list-administrator/list-administrator.component';

const routes: Routes = [
  {path: 'contrat', component: ListContratComponent},
  {path: 'contrats', component: AddContratComponent},
  {path: 'listAdmin', component: ListAdministratorComponent},
  {path: '', redirectTo: 'contrat', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
