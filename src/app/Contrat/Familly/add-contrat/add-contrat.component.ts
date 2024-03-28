import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-add-contrat',
  templateUrl: './add-contrat.component.html',
 styleUrls: ['./add-contrat.component.css']
})
export class AddContratComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToListFamille(){
    const link = ['/contrat'];
    this.router.navigate(link);
  }
}
