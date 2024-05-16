import { Component, OnInit } from '@angular/core';
import { DirecteurService } from '../../ContratService/directeur.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-list-directeur',
  templateUrl: './list-directeur.component.html',
  styleUrls: [ '../../Familly/list-familly/list-familly-component.css'
]
})
export class ListDirecteurComponent implements OnInit {
  director: any[] = [];
  filterDirecteur: any[] = [];
  searchQuery: string = '';

  constructor(
    private router: Router,
    private directeurService: DirecteurService
  ) { }

  ngOnInit(): void {
    this.getListDirector();
  }

  getListDirector(): void {
    this.directeurService.getDirecteur().subscribe(
      director => {
        this.director = director;
        console.log(this.director);
      },
      error => {
        console.error("erreur: ", error);
      }
    )
  }
  
  applyFilter(): void {
    if (this.searchQuery.trim() === '') {
      this.filterDirecteur = this.director;
    } else {
      this.filterDirecteur = this.director.filter(director =>
        (director.name_directeur && director.name_directeur.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
        (director.lastname_directeur && director.lastname_directeur.toLowerCase().includes(this.searchQuery.toLowerCase()))
        (director.email && director.email.toLowerCase().includes(this.searchQuery.toLowerCase()))
      );
    }
    console.log(this.applyFilter)
  }

}
