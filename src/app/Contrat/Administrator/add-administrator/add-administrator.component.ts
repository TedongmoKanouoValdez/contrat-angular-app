import { Component, OnInit } from '@angular/core';
import { AdministratorService } from '../../ContratService/administrator.service';
import {  ActivatedRoute, Router } from '@angular/router';
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
  

  emailPattern: RegExp = /\b[A-Za-z0-9._%+-]+@gmail\.com\b/;

  constructor( 
    private router : Router,
    private adminService: AdministratorService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.parametreId = this.route.snapshot.queryParams['edit'] || undefined;
  }

  createAdmin(): void {
    // Vérification des champs requis
    if (!this.firstname || !this.lastname || !this.email || !this.phoneNumber) {
      this.errorMessage = "Tous les champs sont requis!";
      setTimeout(() => {
        this.errorMessage = null; // Réinitialiser le message d'erreur après 3 secondes (3000 millisecondes)
      }, 3000);
      return;
    }
  
    // Vérification de l'email
    if (!this.emailPattern.test(this.email)) {
      this.errorMessage = 'Action échouée : l\'email doit être au format @gmail.com.';
      return;
    }
  
    // Si tous les champs sont remplis et que l'email est valide
    const adminData = {
      Firstname: this.firstname,
      Lastname: this.lastname,
      Email: this.email,
      PhoneNumber: this.phoneNumber
    };
  
    this.adminService.postAdmin(adminData)
      .subscribe(
        (response) => {
          this.successMessage = 'L\'action s\'est déroulée avec succès.';
          setTimeout(() => {
            this.goToListAdmin();
          }, 2000);
        },
        (err) => {
          this.errorMessage = 'Cette admin existe déjà.';
          if (err && err.error && err.error.message) {
            this.errorMessage += ' ' + err.error.message;
          }
          setTimeout(() => {
            this.errorMessage = null;
          }, 3000);
        }
      );
  }

  goToListAdmin(){
    const link = ['/listAdmin'];
      this.router.navigate(link);
  }
}


