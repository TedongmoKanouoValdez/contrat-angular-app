import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContratService {
  apiUrlGet = 'https://localhost:7036/api/Familly/all';
  apiUrlPost = 'https://localhost:7036/api/Familly';
  apiSearch = 'https://localhost:7036/api/Familly/byName/';
  

  constructor(private http: HttpClient) { }

  getAllFamillies(): Observable<any[]>{
   
    return this.http.get<any[]>(this.apiUrlGet);
  }

  createFamilly(data: any): Observable<any>{
    return this.http.post<any>(this.apiUrlPost, data);
  }

  searchFamillyByName(name: string): Observable<any>{
    return this.http.get<any>(`${this.apiSearch}${name}`);
  }

  updateFamilly(id: number, data: any): Observable<any> {
    const url = `${this.apiUrlPost}/${id}`;
    return this.http.put<any>(url, data);
  }
}
