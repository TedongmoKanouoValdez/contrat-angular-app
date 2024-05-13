import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-expert-details',
  templateUrl:'./expert-details.component.html',
  styles: [
  ]
})
export class ExpertDetailsComponent implements OnInit {

  @Input() expert: any;
  constructor() { }

  ngOnInit(): void {
  }

}
