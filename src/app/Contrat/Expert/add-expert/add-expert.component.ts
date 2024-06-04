import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExpertService } from '../../ContratService/expert.service';

@Component({
  selector: 'app-add-expert',
  templateUrl: './add-expert.component.html',
  styleUrls: ['./add-expert.component.css']
})
export class AddExpertComponent implements OnInit {
  showExpertiseForm: boolean = false;
  // Propriété pour suivre l'état du basculement
  isMessageVisible: boolean = false;
  isAjouterVisible: boolean = true;
  selectedExpertId: number | null = null;
  isDetailsVisible: boolean = false;

  expert: any[] = [];
  expertise: any[] = [];

  constructor(
    private router: Router,
    private expertService: ExpertService
  ) { }

  ngOnInit(): void {
    this.getListExpert();
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

  toggleExpertiseForm() {
    this.showExpertiseForm = !this.showExpertiseForm;
  }

  cancel() {
    this.showExpertiseForm = false;
  }

  validate() {
    // Logique pour valider l'ajout d'une expertise
    this.showExpertiseForm = false;
  }
  goToListExpert():void{
    const link = ['/listExpert'];
    this.router.navigate(link);
  }

  onButtonClickAddExpert(): void {
     this.isMessageVisible = !this.isMessageVisible;
     this.isAjouterVisible = !this.isAjouterVisible;
     const elements = document.querySelectorAll('.content_btnAddExpert');
     
     elements.forEach((element) => {
      const htmlElement = element as HTMLElement;
      htmlElement.style.marginBottom = '0rem'
    });
  }

  onExpertChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedExpertId = Number(selectElement.value);
    if (!Number.isNaN(Number(this.selectedExpertId))) {
      this.isDetailsVisible = false;
    }
    console.log('Selected expert ID:', this.selectedExpertId); 
  }

  validerChoix(event: Event): void {
    if (this.selectedExpertId === null) {
      this.isDetailsVisible = true;
    } else {      
      if (!Number.isNaN(Number(this.selectedExpertId))) {
        this.selectedExpertId = this.selectedExpertId;
        console.log('Selected expert ID:', this.selectedExpertId);
      } else {
        this.isDetailsVisible = true;
      }
    }
  }

  endChoix(event: Event): void {
    this.selectedExpertId = null;
    this.isDetailsVisible = false;
    this.isAjouterVisible = !this.isAjouterVisible;
    this.isMessageVisible = !this.isMessageVisible;
    console.log('Selected expert ID:', this.selectedExpertId);
  }

}
