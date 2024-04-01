import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContratService } from 'src/app/contrat.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Content } from '@angular/compiler/src/render3/r3_ast';

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
    private contratService: ContratService,
    private modalService: NgbModal
    ) { }

  ngOnInit(): void {
    this.getListContrats();
  }

  openModal(content: any) {
    // Utilisez btnId pour ouvrir la modal appropriée
    const modalRef = this.modalService.open(content);
    // Vous pouvez utiliser btnId pour personnaliser le comportement de la modal en fonction du bouton cliqué
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
                  this.searchResults = response.map((item: any) => item.name); // Mettre à jour les résultats de la recherche
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
