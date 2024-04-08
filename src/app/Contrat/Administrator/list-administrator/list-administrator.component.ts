import { Component, OnInit } from '@angular/core';
import { AdministratorService } from '../../ContratService/administrator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-administrator',
  templateUrl:'./list-administrator.html',
  styleUrls: [ '../../Familly/list-contrat/list-contrat-component.css'
  ]
})
export class ListAdministratorComponent implements OnInit {
  admin: any[] = [];

  constructor(
    private router : Router,
    private adminService: AdministratorService
  ) { }

  ngOnInit(): void {
    this.getListAdmin();
  }

  getListAdmin(): void{
    this.adminService.getAdmin().subscribe(
      admin => {
        this.admin = admin;
        console.log(this.admin);
      },
      error => {
        console.error ("erreur :" , error);
      }
    )
  }

  // getListAdmin(): void {
  //   this.adminService.getAdmin().subscribe(
  //     (admin: any[]) => {
  //       console.log('Données reçues :', admin);
  //       this.admin = admin;
  //       this.adminData = [...this.admin];
  //       console.log(this.adminData);
  //     },
  //     (error) => {
  //       console.error('Erreur :', error);
  //     }
  //   );
  // }
}
