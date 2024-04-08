import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
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

  constructor(
    private router: Router,
    private contratService: ContratService) { }

  ngOnInit(): void {
  }

  createdFamilly(): void {

    if (!this.familleName) {
      this.errorMessage = 'Action échouée : le nom de la famille est requis.';
      return; // Arrêter l'exécution de la méthode
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
          }, 2000); // Redirige après 2 secondes (2000 ms)
        },
        (error) => {
          this.errorMessage = 'Cette famille existe deja';
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
