import { Component, OnInit, Renderer2 } from '@angular/core';
import {  Router,ActivatedRoute } from '@angular/router';
import { ContratService } from '../../ContratService/contrat.service';


@Component({
  selector: 'app-add-contrat',
  templateUrl: './add-contrat.component.html',
 styleUrls: ['./add-contrat.component.css']
})
export class AddContratComponent implements OnInit {
  familleName: string;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  familleNameTouched = false;
  parametre: string;
  parametreId: string;
  parametreistrue: string;

  constructor(
    private router: Router,
    private contratService: ContratService,
    private route: ActivatedRoute,
    private renderer: Renderer2) { }

  ngOnInit(): void {
    // Récupération des paramètre de l'URL
    this.parametre = this.route.snapshot.queryParams['name']|| undefined;
    this.parametreId = this.route.snapshot.queryParams['edit']|| undefined;
  }

  //
  ngAfterViewInit(): void {
    if (this.parametre) {
      // Pour modifier la valeur de l'élément .userName
      const userName = document.getElementById('userName') as HTMLInputElement; 
      
      // Pour modifier le texte de l'élément .titrePage
      const titrePage = document.querySelector('.titrePage');
      // Renderer pour les raisons de securité et compatibilité pour modifier
      // le texte en interne avec la methode setProperty
      this.renderer.setProperty(titrePage, 'innerText', 'Modifier une famille');

      if (userName) { // Vérifie si l'élément existe et definir la valeur du champs
        userName.value = this.parametre; 
          
      } else {
        console.error("L'élément avec l'ID 'userName' n'existe pas dans le DOM.");
      }
    }
  }

  createdFamilly(): void {

    if (!this.familleName) {
      this.errorMessage = 'Action échouée : le nom de la famille est requis.';
      return;
    }
    
    const famillyData = {
      Name: this.familleName
    };
  
    this.contratService.createFamilly(famillyData)
      .subscribe(
        () => {
          this.successMessage = 'L\'action s\'est déroulée avec succès.';
          setTimeout(() => {
           this.goToListFamille();
          }, 2000);
        },
        (error) => {
          this.errorMessage = 'Cette famille existe deja';
          // if (error && error.error && error.error.message) {
          //   this.errorMessage += ' ' + error.error.message;
          // }
          setTimeout(() => {
            this.errorMessage = null;
          }, 3000);
        }
      );
  
  }

  updateFamilly(): void {
    // Pour modifier la valeur de l'élément .userName
    const userName = document.getElementById('userName') as HTMLInputElement; 
    //verifie si le champs est vide pour modifier et si ce n'est pas le cas il ne fait rien
    if (!userName.value) {
      this.parametreistrue = 'true';
      return;
    }

    if (userName.value == this.parametre) {
      return;
    }

    const Data = {
      id: +this.parametreId,
      Name: userName.value
    };
    
    this.contratService.updateFamilly(+this.parametreId, Data)
      .subscribe(
        () => {
          this.successMessage = 'L\'action s\'est déroulée avec succès.';
          setTimeout(() => {
           this.goToListFamille();
          }, 2000);
        },
        (error) => {
          // this.errorMessage = 'Cette famille existe deja';
          if (error && error.error && error.error.message) {
            this.errorMessage += ' ' + error.error.message;
          }
          setTimeout(() => {
            this.errorMessage = null;
          }, 3000);
        }
      );
  }

  
  goToListFamille(){
    const link = ['/contrat'];
    this.router.navigate(link);
  }
}
