import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group } from './group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private baseUrl = "http://localhost:8080/groups";

  constructor(private http: HttpClient) { }

  getGroups(): Observable<Group[]>{
    return this.http.get<Group[]>(`${this.baseUrl}`);
  }

  addGroup(group: Group) {
    console.log(group);
    return this.http.post(`${this.baseUrl}`, group, {observe: 'body'});
  }

  editGroup(id: number, group: Group) {
    return this.http.put(`${this.baseUrl}/${id}`, group);
  }

  deleteGroup(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}