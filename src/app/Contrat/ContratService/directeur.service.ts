import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DirecteurService {
  apiUrlGet = 'https://localhost:7036/api/Directeur';
  
  apiUrlPost ='https://localhost:7036/api/Directeur';
  

  constructor(private http: HttpClient) { }

  getDirecteur(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlGet);
  }

  postDirecteur(clientData: any): Observable<any> {
    return this.http.post<any>(this.apiUrlPost, clientData)
  }

  updateDirecteur(id: number, data:any): Observable<any>{
    const url = `${this.apiUrlGet}/${id}`;
    return this.http.put<any>(url,data);
  }

  deleteDirecteur(directeurId: number): Observable<any>{
    const url = `${this.apiUrlGet}/${directeurId}`;
    return this.http.delete<any>(url);
  }
}
