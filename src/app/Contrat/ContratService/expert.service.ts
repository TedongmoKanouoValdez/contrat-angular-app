import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpertService {

  apiUrlGet = 'https://localhost:7036/api/Expert';

  apiUrlGet1 = 'https://localhost:7036/api/Expertise';

  constructor(private http: HttpClient) { }

  getExpert(): Observable <any[]> {
    return this.http.get<any[]>(this.apiUrlGet);
  }

  getExpertise(): Observable <any[]> {
    return this.http.get<any[]>(this.apiUrlGet1);
  }
}
