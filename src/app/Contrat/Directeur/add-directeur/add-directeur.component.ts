import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute ,Router} from '@angular/router';
import { DirecteurService } from '../../ContratService/directeur.service';

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
    parametre: string;
    parametreId: string;
    parametreIsTrue: string;
    
    emailPattern: RegExp = /\b[A-Za-z0-9._%+-]+@gmail\.com\b/;

  constructor(
    private router: Router,
    private directeurService: DirecteurService,
    private route: ActivatedRoute,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(){
    if(this.parametre) {
      const titlePage = document.querySelector('.titrePage');

      this.renderer.setProperty(titlePage, 'innerText', 'Modifier un directeur');
      const storedData = localStorage.getItem("userData");

      if(storedData != null){
        const userData = JSON.parse(storedData);

        const name_directeur = document.querySelector("#name_directeur") as HTMLInputElement;
        const lastname_directeur = document.querySelector("#lastname_directeur") as HTMLInputElement;
        const email = document.querySelector("#email") as HTMLInputElement;
        const telephone = document.querySelector("#telephone") as HTMLInputElement;

        name_directeur.value = userData.name_directeur;
        lastname_directeur.value = userData.lastname_directeur;
        email.value = userData.email;
        telephone.value = userData.telephone;

        console.log(userData);
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
    if(!this.emailPattern.test(this.email)) {
      this.errorMessage = 'Action echoué : L\'email doit etre au format @gmail.com';
      return;
    }

    
  //verification de l'existence du directeur
  this.directeurService.getDirecteur().subscribe(
    (directeurs) => {
      const existingDirecteur = directeurs.find(directeur =>
        directeur.name_directeur === this.name_directeur &&
        directeur.lastname_directeur === this.lastname_directeur &&
        directeur.email === this.email &&
        directeur.telephone === this.telephone
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
          Telephone: this.telephone
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
    const email = document.querySelector('#emailDirecteur') as HTMLInputElement;
    const name_directeur = document.querySelector('#name_directeur') as HTMLInputElement;
    const lastname_directeur = document.querySelector('#lastname_directeur') as HTMLInputElement;
    const telephone = document.querySelector('#telephone') as HTMLInputElement;

    // Vérification de l'email
    if (!this.emailPattern.test(email.value)) {
      this.errorMessage = 'Action échouée : l\'email doit être au format @gmail.com.';
      return;
    }

    // Vérification des champs requis
    if (!name_directeur.value || !lastname_directeur.value || !email.value || !telephone.value) {
      this.errorMessage = "Tous les champs sont requis!";
      setTimeout(() => {
        this.errorMessage = null; // Réinitialiser le message d'erreur après 3 secondes (3000 millisecondes)
      }, 3000);
      return;
    }
    
      if (storedData != null) {
        const userData = JSON.parse(storedData);
               
        const idDirecteur = document.querySelector('#idDirecteur') as HTMLInputElement;
      
        const id = +idDirecteur.value; // ID de l'administrateur à mettre à jour
        const data = {
          name_directeur: name_directeur.value,
          lastname_directeur: lastname_directeur.value,
          email: email.value,
          telephone: telephone.value
        };

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
    const link = ['/listeDirecteur'];
    this.router.navigate(link);
  }
}



