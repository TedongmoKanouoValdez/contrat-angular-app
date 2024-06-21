import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExpertService } from '../../ContratService/expert.service';
import { error } from 'console';

@Component({
  selector: 'app-list-expert',
  templateUrl: './list-expert.component.html', 
  styleUrls: [ '../../Familly/list-familly/list-familly-component.css'
]
})
export class ListExpertComponent implements OnInit {
  expert: any[] = [];
  expertise: any[] = [];
  selectedExpert: any; // Déclarez une variable pour stocker l'expert sélectionné
  arrayDetailExpert: { id: string | null; name: string | null; prenon: string | null; expertise: string | null; email: string | null; telephone: string | null }[] = [];

  constructor(
    private router: Router,
    private expertService: ExpertService
    ) { }

  ngOnInit(): void {
    this.getListExpert();
    this.getListExpertise();
    this.selectedExpert = null;
  }

  getListExpert(){
    this.expertService.getExpert().subscribe(
      expert => {
        this.expert = expert;
        console.log (this.expert);
      },
      error => {
        console.log("erreur", error);
      }
    )
  }

  getListExpertise(){
    this.expertService.getExpertise().subscribe(
      expertise => {
        this.expertise = expertise;
        console.log (this.expertise);
      },
      error => {
        console.log("erreur", error);
      }
    )
  }

  DetailExpert(event: Event): void {
    const target = event.target as HTMLElement;
    const dataName = target.getAttribute('data-name');
    const dataPrenon = target.getAttribute('data-Prenon');
    const dataExpertise = target.getAttribute('data-Expertise');
    const dataEmail = target.getAttribute('data-Email');
    const dataTelephone = target.getAttribute('data-Telephone');
    const dataid = target.getAttribute('data-id');

    const detail = {
      id: dataid,
      name: dataName,
      prenon: dataPrenon,
      expertise: dataExpertise,
      email: dataEmail,
      telephone: dataTelephone
    };

    this.arrayDetailExpert.push(detail);
    // Stocker une valeur
    localStorage.setItem('detailExpert', JSON.stringify(this.arrayDetailExpert));

    const link = ['/expertDetail'];
    this.router.navigate(link);
  }

  
  goToCreateExpert(): void {
    const link = ['/createExpert'];
    this.router.navigate(link);
  }

  closeModalExpert(){
    const overlay = document.querySelector('.overlay') as HTMLInputElement;
     if (overlay) {
      overlay.style.display = "none";
     }
  }

  modalExpert(){
    const overlay = document.querySelector('.overlay') as HTMLInputElement;

    if(overlay) {
      overlay.style.display = "block";
    }
  }

}
