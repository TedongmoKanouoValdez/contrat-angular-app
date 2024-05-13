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

  selectExpert(expert: any): void {
    this.selectedExpert = expert; // Stockez l'expert sélectionné
  }
  
  
  goToCreateExpert(): void {
    const link = ['/createExpert'];
    this.router.navigate(link);
  }

}
