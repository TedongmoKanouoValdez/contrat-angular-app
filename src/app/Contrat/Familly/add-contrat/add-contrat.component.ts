import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ContratService } from 'src/app/contrat.service';

@Component({
  selector: 'app-add-contrat',
  templateUrl: './add-contrat.component.html',
 styleUrls: ['./add-contrat.component.css']
})
export class AddContratComponent implements OnInit {
  familleName: string;

  constructor(
    private router: Router,
    private contratService: ContratService) { }

  ngOnInit(): void {
  }

  createdFamilly(): void {
    const famillyData = {
      Name: this.familleName
    };
  
    this.contratService.createFamilly(famillyData)
      .subscribe(() => {
        this.goToListFamille();
      });
        
  }

  goToListFamille(){
    const link = ['/contrat'];
    this.router.navigate(link);
  }
}
