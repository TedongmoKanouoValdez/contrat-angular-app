import { Component, OnInit } from '@angular/core';
import { AdministratorService } from '../../ContratService/administrator.service';
import { Router, NavigationExtras } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';


@Component({
  selector: 'app-list-administrator',
  templateUrl:'./list-administrator.html',
  styleUrls: [ '../../Familly/list-contrat/list-contrat-component.css'
  ]
})

export class ListAdministratorComponent implements OnInit {
  admin: any[] = [];
  filteredAdmins: any[] = [];
  searchQuery: string = '';

  constructor(
    private router : Router,
    private adminService: AdministratorService
  ) { }

 
  ngOnInit(): void {
    this.getListAdmin();
  }

  getListAdmin(): void{
    this.adminService.getAdmin().subscribe(
      admin => {
        this.admin = admin;
        console.log(this.admin);
      },
      error => {
        console.error ("erreur :" , error);
      }
    )
  }

  applyFilter() {
    if (this.searchQuery.trim() === '') {
      this.filteredAdmins = this.admin;
    } else {
      this.filteredAdmins = this.admin.filter(admin =>
        admin.firstname.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        admin.lastname.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        admin.email.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }


  goToCreateAdmin(event: MouseEvent){

    const target = event.target as HTMLElement; // Convertit l'élément cible en HTMLElement
    const dataName = target.getAttribute('data-name');
    const dataFirst = target.getAttribute('data-first');
    const dataEmail = target.getAttribute('data-email');
    const dataPhone = target.getAttribute('data-phone');
    const datalast = target.getAttribute('data-last');
    const dataId = target.getAttribute('data-id');

    if (dataName == 'editAdmin' && dataFirst != null && dataId != null) {

      const userDate = {
        userfirst: dataFirst,
        userlast: datalast,
        useremail: dataEmail,
        phone: dataPhone
      };

      const jsonData = JSON.stringify(userDate);
      localStorage.setItem("userData", jsonData);

      const navigationExtras: NavigationExtras = {
        queryParams: { 
          'edit': dataId,
          'name': dataFirst
         } 
      };
      const link = ['/createAdmin'];
      this.router.navigate(link, navigationExtras);

    } else {
      const link = ['/createAdmin'];
      this.router.navigate(link);
    }
    
  }

  closeModalAdmin () {
    const overlay = document.querySelector('.overlay') as HTMLInputElement;
        
    if (overlay) {
      overlay.style.display = "none";
    }
  }

  modaleAdmin(deletefirsname: string, deletelastname: string, deleteId: string) {
    const overlay = document.querySelector('.overlay') as HTMLInputElement;
        
    if (overlay) {
      overlay.style.display = "block";
      
      const titleModal = document.querySelector('.modal-title') as HTMLInputElement;
      const ID = document.querySelector('#iddelete') as HTMLInputElement;
      const Namedelete = document.querySelector('#Namedelete') as HTMLInputElement;
      titleModal.innerText = `Supprimer l'administrateur ${deletefirsname} ${deletelastname}`;
      ID.value = deleteId;
    }
  }

  deleteAdmin(): void {
    const userID = document.getElementById('iddelete') as HTMLInputElement;

    if (!userID) {
        console.error('Veuillez saisir le nom et l\'identifiant de la famille.');
        return;
    }
    

    this.callDeleteAdmin(+userID.value);
    this.callDeleteAdmin(+userID.value);
  }

  callDeleteAdmin(id: number): void {
    this.adminService.deleteAdmin(id)
      .subscribe(
        () => {
            setTimeout(() => {
                window.location.reload();
            });
        },
        (error) => {
            console.log(error);
        }
      );
}



  


  // getListAdmin(): void {
  //   this.adminService.getAdmin().subscribe(
  //     (admin: any[]) => {
  //       console.log('Données reçues :', admin);
  //       this.admin = admin;
  //       this.adminData = [...this.admin];
  //       console.log(this.adminData);
  //     },
  //     (error) => {
  //       console.error('Erreur :', error);
  //     }
  //   );
  // }
}
