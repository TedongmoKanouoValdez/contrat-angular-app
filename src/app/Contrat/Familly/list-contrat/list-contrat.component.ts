import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ContratService } from '../../ContratService/contrat.service';

@Component({
  selector: 'app-list-contrat',
  templateUrl: './list-contrat.component.html',
  styleUrls: ['./list-contrat-component.css']
})
export class ListContratComponent implements OnInit {
    contrats: any[];
    famillyName: string;
    searchResults: any[] = []; // Variable pour stocker les résultats de la recherche


  constructor(
    private router : Router,
    private contratService: ContratService
    ) { }

  ngOnInit(): void {
    this.getListContrats();
  }


  getListContrats(): void {
    this.contratService.getAllFamillies().subscribe(
      contrats => {
        this.contrats = contrats;
        console.log(this.contrats); 
      },
      error => {
        console.error('Une erreur s\'est produite : ', error);
      }
    );
  }

  searching: boolean = false; // Variable pour indiquer si une recherche est en cours

  searchFamillyByName(): void {
      if (this.famillyName.trim() !== '') {
          this.searching = true; // Mettre à jour la variable pour indiquer que la recherche est en cours
          this.contratService.searchFamillyByName(this.famillyName).subscribe(
              (response) => {
                  console.log('Résultat de la recherche :', response);
                  this.searchResults = response.map((item: any) => {
                    return { id: item.id, name: item.name };
                  });
                   // Mettre à jour les résultats de la recherche
                  this.searching = false; // Mettre à jour la variable pour indiquer que la recherche est terminée
              },
              (error) => {
                  console.error('Une erreur est survenue lors de la recherche de famille :', error);
                  this.searching = false; // Mettre à jour la variable pour indiquer que la recherche est terminée
              }
          );
      } else {
          // Gérer le cas où le nom de famille est vide
      }
  }
  
  
  goToCreateFamille(editId: string, editName: string){
    const navigationExtras: NavigationExtras = {
      queryParams: { 
        'edit': +editId,
        'name': editName
       } // Remplacez 'parametre' et 'valeur' par vos propres paramètres
    };
    const link = ['/contrats'];
    this.router.navigate(link, navigationExtras);
  }

  modaleFamille(deleteName: string, deleteId: string) {
    const overlay = document.querySelector('.overlay') as HTMLInputElement;
        
    if (overlay) {
      overlay.style.display = "block";
      
      const titleModal = document.querySelector('.modal-title') as HTMLInputElement;
      const ID = document.querySelector('#iddelete') as HTMLInputElement;
      const Namedelete = document.querySelector('#Namedelete') as HTMLInputElement;
      titleModal.innerText = `Supprimer la famille ${deleteName}`;
      ID.value = deleteId;
      Namedelete.value = deleteName;
    }
  }

  closeModalFamille () {
    const overlay = document.querySelector('.overlay') as HTMLInputElement;
        
    if (overlay) {
      overlay.style.display = "none";
    }
  }

  deleteFamilly(): void {
    const userName = document.getElementById('Namedelete') as HTMLInputElement;
    const userID = document.getElementById('iddelete') as HTMLInputElement;

    if (!userName || !userID) {
        console.error('Veuillez saisir le nom et l\'identifiant de la famille.');
        return;
    }

    const Data = {
        id: +userID.value,
        Name: userName.value
    };
    console.log(Data);

    this.callDeleteFamilly(+userID.value);
    this.callDeleteFamilly(+userID.value);

    // *ngIf="item && item.length > 1"

  }

callDeleteFamilly(id: number): void {
    this.contratService.deleteFamilly(id)
      .subscribe(
        () => {
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        },
        (error) => {
            console.log(error);
        }
      );
}
  
  // searchFamillyByName(): void {
  //   if (this.famillyName.trim() !== '') {
  //       this.contratService.searchFamillyByName(this.famillyName).subscribe(
  //           (response) => {
  //               console.log('Résultat de la recherche :', response);
  //               // Mettre à jour les résultats de la recherche
  //               this.searchResults = response.map((item:any) => item.Name); 
  //           },
  //           (error) => {
  //               console.error('Une erreur est survenue lors de la recherche de famille :', error);
  //               // Gérer l'erreur ici, par exemple, afficher un message d'erreur à l'utilisateur
  //           }
  //       );
  //   } else {
  //       // Gérer le cas où le nom de famille est vide
  //   }


  
  // searchFamillyByName(): void {
  //   if (this.famillyName.trim() !== '') {
  //     this.contratService.searchFamillyByName(this.famillyName).subscribe(
  //       response => {
  //         console.log('Résultat de la recherche :', response);
  //       },
  //       error => {
  //         console.error('Une erreur est survenue lors de la recherche de famille :', error);
  //       }
  //     );
  //   }
  // }
  
  goToAddFamille(){
    const link = ['/contrats'];
    this.router.navigate(link);
  }
  
}
