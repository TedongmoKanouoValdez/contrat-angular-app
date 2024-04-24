import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../ContratService/client.service';
import { NavigationExtras, Router } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: [ '../../Familly/list-familly/list-familly-component.css'
]
})
export class ListClientComponent implements OnInit {
  client: any[] = [];
  filterClient: any[] = [];
  searchQuery: string = '';

  constructor(
    private router: Router,
    private clientService: ClientService
  ) { }

  ngOnInit(): void {
    this.getListClient();
  }

  getListClient(): void {
    this.clientService.getClient().subscribe(
      client => {
        this.client = client;
        console.log(this.client);
      },
      error => {
        console.error("erreur: ", error);
      }
    )
  }

  applyFilter(): void {
    if (this.searchQuery.trim() === '') {
      this.filterClient = this.client;
    } else {
      this.filterClient = this.client.filter(client =>
        (client.Business_area && client.Business_area.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
        (client.Company_name && client.Company_name.toLowerCase().includes(this.searchQuery.toLowerCase()))
      );
    }
    console.log(this.applyFilter)
  }
  

  goToCreateClient(event: MouseEvent){

    const target = event.target as HTMLElement;
    const dataName = target.getAttribute('data-name');
    const dataCode = target.getAttribute('data-code');
    const dataBusiness = target.getAttribute('data-business');
    const dataCompany = target.getAttribute('data-company');
    const dataParent_company_name = target.getAttribute('data-ParentCompanyName');
    const dataId = target.getAttribute('data-id');

    if(dataName == 'editClient' && dataBusiness != null && dataId != null){

      const userDate = {
        userCode: dataCode,
        userBusiness: dataBusiness,
        userCompany: dataCompany,
        userParentCompanyName: dataParent_company_name
      };

      const jsonData = JSON.stringify(userDate);
      localStorage.setItem("userData", jsonData);

      const navigationExtras: NavigationExtras = {
        queryParams: {
          'edit': dataId,
          'name': dataBusiness
        }
      };

      const link = ['/createClient'];
      this.router.navigate(link, navigationExtras);

    }else{
      const link = ['/createClient'];
      this.router.navigate(link);
    }
  }


  closeModalClient(){
    const overlay = document.querySelector('.overlay') as HTMLInputElement;
     if (overlay) {
      overlay.style.display = "none";
     }
  }

  modalClient(deleteId: string){
    const overlay = document.querySelector('.overlay') as HTMLInputElement;

    if(overlay) {
      overlay.style.display = "block";

      const titleModal = document.querySelector('.modal-title') as HTMLInputElement;
      const ID = document.querySelector('#iddelete') as HTMLInputElement;
      const Namedelete = document.querySelector('#Namedelete') as HTMLInputElement;
      titleModal.innerText = 'Voulez-vous vraiment supprimer ce client ';
      ID.value = deleteId;
    }
  }


  deleteClient(): void {
    const userId = document.getElementById('iddelete') as HTMLInputElement;

    if(!userId) {
      console.error ('Veuillez saisir le nom ...')
      return;
    }

    this.callDeleteClient(+userId.value);
    this.callDeleteClient(+userId.value)
  }

  callDeleteClient(id: number): void {
    this.clientService.deleteClient(id).subscribe(
      () => {
        setTimeout( () => {
          window.location.reload();
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
