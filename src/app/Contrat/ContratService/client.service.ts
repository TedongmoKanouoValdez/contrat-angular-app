import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  apiUrlGet = 'https://localhost:7036/api/Client'
  //apiUrlPost ='https://localhost:7036/api/Client'
  
  constructor( private http: HttpClient ) { }

  getClient(): Observable <any[]>{
    return this.http.get<any[]>(this.apiUrlGet);
  }

  postClient(data: any): Observable<any>{
    return this.http.post<any>(this.apiUrlGet, data);
  }

  postClientUpdate(id: number, data: any): Observable<any> {
    const url = `${this.apiUrlGet}/${id}`;
    return this.http.put<any>(url,data);
  }

  deleteClient(clientId: number): Observable<any>{
    const url = `${this.apiUrlGet}/${clientId}`;
    return this.http.delete<any>(url);
  }
}
