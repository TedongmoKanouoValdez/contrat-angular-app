import { Component, OnInit, Renderer2, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute ,Router, NavigationEnd } from '@angular/router';
import { DirecteurService } from '../../ContratService/directeur.service';
import { Console } from 'console';
import { DomManipulationService } from '../../dom-manipulation.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-add-directeur',
  templateUrl:'./add-directeur.component.html',
styleUrls: ['./add-directeur.component.css']
})
export class AddDirecteurComponent implements OnInit {
    errorMessage: string | null;
    successMessage: string;
    name_directeur: string;
    lastname_directeur: string;
    email: string;
    telephone: string;
    company: string;
    parametre: string | null = null;
    parametreId: string;
    parametreIsTrue: string;
    arrayUrl: string[];
    
    emailPattern: RegExp = /\b[A-Za-z0-9._%+-]+@gmail\.com\b/;

  constructor(
    private router: Router,
    private directeurService: DirecteurService,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private domManipulationService: DomManipulationService
  ) { this.arrayUrl = ['/createClient', '/familly', '/createAdmin', '/createExpert', '/createDirector']; }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.parametre = params['name'];
      // Déclencher une nouvelle vérification des modifications
      this.cdr.detectChanges();
    });

    this.route.queryParams.subscribe(params => {
      this.parametreId = params['edit'];
      // Déclencher une nouvelle vérification des modifications
      this.cdr.detectChanges();
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const currentUrl = this.router.url;
      this.checkAndSetNavbarWidth(currentUrl);
    });

    // Check the URL initially when the component is loaded
    this.checkAndSetNavbarWidth(this.router.url);
  }
  @ViewChild('titlePage', { static: true }) titlePage!: ElementRef;


  private checkAndSetNavbarWidth(currentUrl: string): void {
    const navbarWidth = this.arrayUrl.includes(currentUrl) ? '13rem' : '1rem';
    this.domManipulationService.setNavbarWidth('.navbarcontent', navbarWidth);
  }

  ngAfterViewInit(){

    // console.log( this.nameDirecteur.nativeElement)
    if(this.parametre) {
      const titlePage = document.querySelector('.titrePage');

      this.titlePage.nativeElement.innerText = 'Modifier un directeur';
      const storedData = localStorage.getItem("userData");
      
      const nameDirecteur = document.querySelector('#nameDirecteur') as HTMLInputElement | null;
      const lastnameDirecteur = document.querySelector('#lastnameDirecteur') as HTMLInputElement | null;
      const email = document.querySelector('#email') as HTMLInputElement | null;
      const companyAdd = document.querySelector('#companyAdd') as HTMLInputElement | null;
      const telephone = document.querySelector('#telephone') as HTMLInputElement ;
      if(storedData){
        // console.log(this.nameDirecteur)
        const userData = JSON.parse(storedData);
        console.log(userData)
        if (nameDirecteur && lastnameDirecteur && email && companyAdd && telephone) {
          nameDirecteur.value = userData.userNameEx;
          lastnameDirecteur.value = userData.userLastname;
          email.value = userData.useremail;
          companyAdd.value = userData.userCompany;
          telephone.value = userData.userTelephone;
      } else {
          console.error('Un ou plusieurs éléments n\'ont pas été trouvés dans le DOM.');
      }
      }
    }
  }

  createDirecteur(): void {
    this.errorMessage = null;

    if(!this.name_directeur){
      this.errorMessage = "Le nom du directeur est requis";
    }
    if(!this.lastname_directeur){
      this.errorMessage = "Le prenom est requis"
    }
    if(!this.company){
      this.errorMessage = "le nom de la societé est requise"
    }
    if(!this.telephone){
      this.errorMessage = "le numero de telephone est requis"
    }
    if(!this.emailPattern.test(this.email)) {
      this.errorMessage = 'Action echoué : L\'email doit etre au format @gmail.com';
      return;
    }

    if (this.errorMessage) {
      setTimeout(() => {
        this.errorMessage = null;
      }, 3000);
      return;
    }

    
  //verification de l'existence du directeur
  this.directeurService.getDirecteur().subscribe(
    (directeurs) => {
      const existingDirecteur = directeurs.find(directeur =>
        directeur.name_directeur === this.name_directeur &&
        directeur.lastname_directeur === this.lastname_directeur &&
        directeur.email === this.email &&
        directeur.telephone === this.telephone &&
        directeur.company === this.company
      );

      if (existingDirecteur) {
        this.errorMessage = 'Ce directeur existe déjà.';
        setTimeout(() => {
          this.errorMessage = null;
        }, 3000);
      } else {
        // Si tous les champs sont remplis et que l'email est valide et que l'admin n'existe pas encore
        const directeurData = {
          Name_directeur: this.name_directeur,
          Lastname_directeur: this.lastname_directeur,
          Email: this.email,
          Telephone: this.telephone,
          Company: this.company
        };

        this.directeurService.postDirecteur(directeurData).subscribe(
          (response) => {
            this.successMessage = 'L\'action s\'est déroulée avec succès.';
            setTimeout(() => {
              this.goToListDirecteur();
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



  updateDirecteur(): void {
    const storedData = localStorage.getItem("userData");
    const emailUpdate = document.querySelector('#email') as HTMLInputElement | null;
    const name_directeurUpdate = document.querySelector('#nameDirecteur') as HTMLInputElement | null;
    const lastname_directeurUpdate = document.querySelector('#lastnameDirecteur') as HTMLInputElement | null;
    const telephoneUpdate = document.querySelector('#telephone') as HTMLInputElement | null;
    const companyUpdate = document.querySelector("#companyAdd") as HTMLInputElement | null;
    console.log(emailUpdate?.value)
    // Vérification des éléments
    if (name_directeurUpdate?.value == "" || lastname_directeurUpdate?.value == "" || telephoneUpdate?.value == "" || companyUpdate?.value == "") {
        this.errorMessage = "Tous les champs sont requis!";
        setTimeout(() => {
            this.errorMessage = null;
        }, 3000);
        return;
    }

    // Vérification de l'email
    // if (!this.emailPattern.test(emailUpdate.value)) {
    //     this.errorMessage = 'Action échouée : l\'email doit être au format @gmail.com.';
    //     return;
    // }
  
    
      if (storedData != null) {
        const userData = JSON.parse(storedData);
          console.log(userData);
               
        const idDirecteur = document.querySelector('#idDirecteur') as HTMLInputElement;
      
        const id = +idDirecteur.value; 
        const data = {
          name_directeur: name_directeurUpdate?.value,
          lastname_directeur: lastname_directeurUpdate?.value,
          email: emailUpdate?.value,
          telephone: telephoneUpdate?.value,
          company: companyUpdate?.value,
        };
        console.log(id)
        this.directeurService.updateDirecteur(id, data)
          .subscribe(
            (response) => {
              this.successMessage = 'directeur mis à jour avec succès';
              setTimeout(() => {
                this.goToListDirecteur();
              }, 2000);
              console.log('Directeur mis à jour avec succès :', response);
              // Effectuez les actions nécessaires après la mise à jour réussie
            },
            (error) => {
              console.error('Erreur lors de la mise à jour du directeur :', error);
              // Traitez les erreurs de mise à jour du directeur
            }
          );
      }
  }
  goToListDirecteur(){
    const link = ['/listDirecteur'];
    this.router.navigate(link);
  }
  
 
}




