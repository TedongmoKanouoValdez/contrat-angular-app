import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-expert',
  templateUrl: './add-expert.component.html',
  styleUrls: ['./add-expert.component.css']
})
export class AddExpertComponent implements OnInit {
  showExpertiseForm: boolean = false;
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

 
}
