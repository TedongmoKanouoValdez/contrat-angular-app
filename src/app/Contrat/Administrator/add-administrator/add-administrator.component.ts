import { Component, OnInit, Renderer2} from '@angular/core';
import { AdministratorService } from '../../ContratService/administrator.service';
import {  ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { DomManipulationService } from '../../dom-manipulation.service';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-add-administrator',
  templateUrl: './add-administrator.html',
  styleUrls: [ './add-administrator.css'
  ]
})
export class AddAdministratorComponent implements OnInit {
  errorMessage: string | null;
  successMessage: string;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  parametre: string;
  parametreId: string;
  paramrtreIsTrue: string;
  arrayUrl: string[];
  

  emailPattern: RegExp = /\b[A-Za-z0-9._%+-]+@gmail\.com\b/;

  constructor( 
    private router : Router,
    private adminService: AdministratorService,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private domManipulationService: DomManipulationService) { this.arrayUrl = ['/createClient', '/familly', '/createAdmin', '/createExpert', '/createDirector']; }

  ngOnInit(): void {
    this.parametreId = this.route.snapshot.queryParams['edit'] || undefined;
    this.parametre = this.route.snapshot.queryParams['name'] || undefined;

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const currentUrl = this.router.url;
      this.checkAndSetNavbarWidth(currentUrl);
    });

    // Check the URL initially when the component is loaded
    this.checkAndSetNavbarWidth(this.router.url);
  }

  private checkAndSetNavbarWidth(currentUrl: string): void {
    const navbarWidth = this.arrayUrl.includes(currentUrl) ? '13rem' : '1rem';
    this.domManipulationService.setNavbarWidth('.navbarcontent', navbarWidth);
  }

  ngAfterViewInit(): void {
    if(this.parametre){
      const titlePage = document.querySelector('.titrePage');

      this.renderer.setProperty(titlePage, 'innerText', 'Modifier un administrateur')
      const storedData = localStorage.getItem("userData");

      if (storedData != null) {
        const userData = JSON.parse(storedData);
        const firstnameAdmin = document.querySelector('#firstnameAdmin') as HTMLInputElement;
        const lastnameAdmin = document.querySelector('#lastnameAdmin') as HTMLInputElement;
        const phoneAdmin = document.querySelector('#phoneAdmin') as HTMLInputElement;
        const emailAdmin = document.querySelector('#emailAdmin') as HTMLInputElement;
        
        firstnameAdmin.value = userData.userfirst;
        lastnameAdmin.value = userData.userlast;
        phoneAdmin.value = userData.phone;
        emailAdmin.value = userData.useremail;

        emailAdmin.disabled = true;
      }
    }
  }

  // createAdmin(): void {
  //   // Vérification des champs requis
  //   if (!this.firstname || !this.lastname || !this.email || !this.phoneNumber) {
  //     this.errorMessage = "Tous les champs sont requis!";
  //     setTimeout(() => {
  //       this.errorMessage = null; 
  //     }, 3000);
  //     return;
  //   }
  
  //   // Vérification de l'email
  //   if (!this.emailPattern.test(this.email)) {
  //     this.errorMessage = 'Action échouée : l\'email doit être au format @gmail.com.';
  //     return;
  //   }
  
  //   // Si tous les champs sont remplis et que l'email est valide
  //   const adminData = {
  //     Firstname: this.firstname,
  //     Lastname: this.lastname,
  //     Email: this.email,
  //     PhoneNumber: this.phoneNumber
  //   };
  
  //   this.adminService.postAdmin(adminData)
  //     .subscribe(
  //       (response) => {
  //         this.successMessage = 'L\'action s\'est déroulée avec succès.';
  //         setTimeout(() => {
  //           this.goToListAdmin();
  //         }, 2000);
  //       },
  //       (err) => {
  //         this.errorMessage = 'Cette admin existe déjà.';
  //         if (err && err.error && err.error.message) {
  //           this.errorMessage += ' ' + err.error.message;
  //         }
  //         setTimeout(() => {
  //           this.errorMessage = null;
  //         }, 3000);
  //       }
  //     );
  // }

  createAdmin(): void {
    // Vérification des champs requis
    if (!this.firstname || !this.lastname || !this.email || !this.phoneNumber) {
      this.errorMessage = "Tous les champs sont requis!";
      setTimeout(() => {
        this.errorMessage = null; 
      }, 3000);
      return;
    }
  
    // Vérification de l'email
    if (!this.emailPattern.test(this.email)) {
      this.errorMessage = 'Action échouée : l\'email doit être au format @gmail.com.';
      return;
    }
  
    // Vérification si l'admin existe déjà
    this.adminService.getAdmin().subscribe(
      (admins) => {
        const existingAdmin = admins.find(admin =>
          admin.firstname === this.firstname &&
          admin.lastname === this.lastname &&
          admin.email === this.email &&
          admin.phoneNumber === this.phoneNumber
        );
  
        if (existingAdmin) {
          this.errorMessage = 'Cet admin existe déjà.';
          setTimeout(() => {
            this.errorMessage = null;
          }, 3000);
        } else {
          // Si tous les champs sont remplis et que l'email est valide et que l'admin n'existe pas encore
          const adminData = {
            Firstname: this.firstname,
            Lastname: this.lastname,
            Email: this.email,
            PhoneNumber: this.phoneNumber
          };
  
          this.adminService.postAdmin(adminData).subscribe(
            (response) => {
              this.successMessage = 'L\'action s\'est déroulée avec succès.';
              setTimeout(() => {
                this.goToListAdmin();
              }, 2000);
            },
            (err) => {
              this.errorMessage = 'L\'action s\'est déroulée a echoué.';
              if (err && err.error && err.error.message) {
                this.errorMessage += ' ' + err.error.message;
              }
              setTimeout(() => {
                this.errorMessage = null;
              }, 3000);
            }
          );
        }
      }
    );
  }
  

  updateAdmin(): void {
    const storedData = localStorage.getItem("userData");
    const emailAdmin = document.querySelector('#emailAdmin') as HTMLInputElement;
    const firstnameAdmin = document.querySelector('#firstnameAdmin') as HTMLInputElement;
    const lastnameAdmin = document.querySelector('#lastnameAdmin') as HTMLInputElement;
    const phoneAdmin = document.querySelector('#phoneAdmin') as HTMLInputElement;

    // Vérification de l'email
    if (!this.emailPattern.test(emailAdmin.value)) {
      this.errorMessage = 'Action échouée : l\'email doit être au format @gmail.com.';
      return;
    }

    // Vérification des champs requis
    if (!firstnameAdmin.value || !lastnameAdmin.value || !emailAdmin.value || !phoneAdmin.value) {
      this.errorMessage = "Tous les champs sont requis!";
      setTimeout(() => {
        this.errorMessage = null; // Réinitialiser le message d'erreur après 3 secondes (3000 millisecondes)
      }, 3000);
      return;
    }
    
      if (storedData != null) {
        const userData = JSON.parse(storedData);
               
        const idAdmin = document.querySelector('#idAdmin') as HTMLInputElement;
      
        const id = +idAdmin.value; // ID de l'administrateur à mettre à jour
        const data = {
          firstname: firstnameAdmin.value,
          lastname: lastnameAdmin.value,
          email: emailAdmin.value,
          phoneNumber: phoneAdmin.value
        };

        this.adminService.postAdminUpdate(id, data)
          .subscribe(
            (response) => {
              this.successMessage = 'Administrateur mis à jour avec succès';
              setTimeout(() => {
                this.goToListAdmin();
              }, 2000);
              console.log('Administrateur mis à jour avec succès :', response);
              // Effectuez les actions nécessaires après la mise à jour réussie
            },
            (error) => {
              console.error('Erreur lors de la mise à jour de l\'administrateur :', error);
              // Traitez les erreurs de mise à jour de l'administrateur
            }
          );
      }
  }

  goToListAdmin(){
    const link = ['/listAdmin'];
      this.router.navigate(link);
  }
}


