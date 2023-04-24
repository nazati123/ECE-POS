import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Faculty } from './faculty';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {
  private baseUrl = "http://localhost:8080/faculty";

  constructor(private http: HttpClient) { }

  getApprovers(): Observable<Faculty[]>{
    return this.http.get<Faculty[]>(`${this.baseUrl}`);
  }

  addApprover(faculty: Faculty) {
    return this.http.post(`${this.baseUrl}`, faculty, {observe: 'body'});
  }

  editApprover(email: string, faculty: Faculty) {
    return this.http.put(`${this.baseUrl}/${email}`, faculty);
  }

  deleteApprover(email: string) {
    return this.http.delete(`${this.baseUrl}/${email}`);
  }

}