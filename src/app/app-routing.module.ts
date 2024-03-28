import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListContratComponent } from './Contrat/Familly/list-contrat/list-contrat.component';
import { AddContratComponent } from './Contrat/Familly/add-contrat/add-contrat.component';

const routes: Routes = [
  {path: 'contrat', component: ListContratComponent},
  {path: 'contrats', component: AddContratComponent},
  {path: '', redirectTo: 'contrat', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
