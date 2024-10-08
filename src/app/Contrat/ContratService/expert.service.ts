import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExpertService {

  apiUrl = 'https://localhost:7036/api/Expert';

  apiUrlGet1 = 'https://localhost:7036/api/Expertise';

  apiUrlExpertId = 'https://localhost:7036/api/Expertise';


  constructor(private http: HttpClient) { }

  getExpert(): Observable <any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getExpertise(): Observable <any[]> {
    return this.http.get<any[]>(this.apiUrlGet1);
  }

  getExpertiseid(): Observable <any[]> {
    return this.http.get<any[]>(this.apiUrlExpertId);
  }

  postExpert(expertData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, expertData, {
       headers: new HttpHeaders({
          'Content-Type': 'application/json'
       })
    });
 }
 

  deleteExpert(expertId: number): Observable<any> {
    const url = `${this.apiUrl}/${expertId}`;
    return this.http.delete<any>(url);
  }

  updateExpert(id: number, data: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url,data);
  }
}
