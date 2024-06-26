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

  postAdmin(data: any): Observable<any>{
    return this.http.post<any>(this.apiUrlPost, data);
  }

  postAdminUpdate(id: number, data: any): Observable<any> {
    const url = `${this.apiUrlPost}/${id}`; // URL avec l'ID de l'administrateur
    return this.http.put<any>(url, data);
  }

  deleteAdmin(adminId: number): Observable<any> {
    const url = `${this.apiUrlPost}/${adminId}`;
    return this.http.delete<any>(url);
  }
  
}
