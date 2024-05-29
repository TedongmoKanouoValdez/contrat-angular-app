import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  expert: any[] = [];

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
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

 
}
