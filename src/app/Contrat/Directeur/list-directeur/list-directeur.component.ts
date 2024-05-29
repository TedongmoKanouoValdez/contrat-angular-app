import { Component, OnInit } from '@angular/core';
import { DirecteurService } from '../../ContratService/directeur.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-list-directeur',
  templateUrl: './list-directeur.component.html',
  styleUrls: [ '../../Familly/list-familly/list-familly-component.css'
]
})
export class ListDirecteurComponent implements OnInit {
  director: any[] = [];
  filterDirecteur: any[] = [];
  searchQuery: string = '';

  constructor(
    private router: Router,
    private directeurService: DirecteurService
  ) { }

  ngOnInit(): void {
    this.getListDirector();
  }

  getListDirector(): void {
    this.directeurService.getDirecteur().subscribe(
      director => {
        this.director = director;
        console.log(this.director);
      },
      error => {
        console.error("erreur: ", error);
      }
    )
  }
  
  applyFilter(): void {
    if (this.searchQuery.trim() === '') {
      this.filterDirecteur = this.director;
    } else {
      this.filterDirecteur = this.director.filter(director =>
        (director.name_directeur && director.name_directeur.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
        (director.lastname_directeur && director.lastname_directeur.toLowerCase().includes(this.searchQuery.toLowerCase()))
        (director.email && director.email.toLowerCase().includes(this.searchQuery.toLowerCase()))
      );
    }
    console.log(this.applyFilter)
  }

  goToCreateDirector(event: MouseEvent){

    const target = event.target as HTMLElement;
    const dataName = target.getAttribute('data-name');
    const dataLastname = target.getAttribute('data-lastname');
    const dataCompany = target.getAttribute('data-company');
    const dataTelephone  = target.getAttribute('data-telephone');
    const dataId = target.getAttribute('data-id');

    if(dataName == 'editDirecteur' && dataLastname != null && dataId != null){

      const userDate = {
        userName: dataName,
        userLastname: dataLastname,
        userCompany: dataCompany,
        userTelephone: dataTelephone
      };

      const jsonData = JSON.stringify(userDate);
      localStorage.setItem("userData", jsonData);

      const navigationExtras: NavigationExtras = {
        queryParams: {
          'edit': dataId,
          'name': dataName
        }
      };

      const link = ['/createDirector'];
      this.router.navigate(link, navigationExtras);

    }else{
      const link = ['/createDirector'];
      this.router.navigate(link);
    }
  }

  closeModalDirecteur(){
    const overlay = document.querySelector('.overlay') as HTMLInputElement;
     if (overlay) {
      overlay.style.display = "none";
     }
  }

  modalDirecteur(deleteName: string, deleteLastname:string, deleteId: string){
    const overlay = document.querySelector('.overlay') as HTMLInputElement;

    if(overlay) {
      overlay.style.display = "block";

      const titleModal = document.querySelector('.modal-title') as HTMLInputElement;
      const ID = document.querySelector('#iddelete') as HTMLInputElement;
      const Namedelete = document.querySelector('#Namedelete') as HTMLInputElement;
      titleModal.innerText = `Supprimer le directeur ${deleteName} ${deleteLastname}`;
      ID.value = deleteId;
    }
  }

  
  deleteDirecteur(): void {
    const userId = document.getElementById('iddelete') as HTMLInputElement;

    if(!userId) {
      console.error ('Veuillez saisir le nom ...')
      return;
    }
    this.callDeleteDirecteur(+userId.value);
  }

  callDeleteDirecteur(id: number): void {
    this.directeurService.deleteDirecteur(id).subscribe(
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
