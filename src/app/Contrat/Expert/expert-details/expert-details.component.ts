import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-expert-details',
  templateUrl:'./expert-details.component.html',
  styleUrls: [ '../../Familly/list-familly/list-familly-component.css'
  ]
})
export class ExpertDetailsComponent implements OnInit {
  
  @Input() expert: any;
  @ViewChild('name', { static: true }) name!: ElementRef;
  @ViewChild('prenom', { static: true }) prenom!: ElementRef;
  @ViewChild('prenomt', { static: true }) prenomt!: ElementRef;
  @ViewChild('experte', { static: true }) experte!: ElementRef;
  @ViewChild('email', { static: true }) email!: ElementRef;
  @ViewChild('contact', { static: true }) contact!: ElementRef;
  // @ViewChild('textElement', { static: true }) textElement!: ElementRef;
  @ViewChild('nameIn', { static: true }) nameIn!: ElementRef;
  @ViewChild('prenomIn', { static: true }) prenomIn!: ElementRef;
  @ViewChild('expertIn', { static: true }) expertIn!: ElementRef;
  @ViewChild('emailIn', { static: true }) emailIn!: ElementRef;
  @ViewChild('contactIn', { static: true }) contactIn!: ElementRef;
  // @ViewChild('inputElement', { static: true }) inputElement!: ElementRef;

  constructor() { }

  ngOnInit(): void {
    this.AfficheDetail();
  }

  AfficheDetail(){
    // Récupérer et afficher la valeur
    const DetailExpert = localStorage.getItem('detailExpert');

    if (DetailExpert) {
      // Analyser les données JSON
      const expertDetails = JSON.parse(DetailExpert);
      const expert = expertDetails[0]; // Supposons que vous utilisez le premier élément du tableau

      this.name.nativeElement.innerText = expert.name;
      this.prenom.nativeElement.innerText = expert.prenon;
      this.prenomt.nativeElement.innerText = expert.prenon;
      this.experte.nativeElement.innerText = expert.expertise;
      this.email.nativeElement.innerText = expert.email;
      this.contact.nativeElement.innerText = expert.telephone;

      this.nameIn.nativeElement.value = expert.name;
      this.prenomIn.nativeElement.value = expert.prenon;
      this.expertIn.nativeElement.value = expert.expertise;
      this.emailIn.nativeElement.value = expert.email;
      this.contactIn.nativeElement.value = expert.telephone;
    }
  }
}
