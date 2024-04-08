import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministratorService {
  apiUrlGet= 'https://localhost:7036/api/Administrateur/all';
  apiUrlPost = 'https://localhost:7036/api/Administrateur';
  constructor( private http: HttpClient) { }

  getAdmin(): Observable<any[]>{
    return this.http.get<any[]>(this.apiUrlGet);
  }

  createAdmin(data: any): Observable<any>{
    return this.http.post<any>(this.apiUrlPost, data);
  }
}
