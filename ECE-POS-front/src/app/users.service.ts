import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = "http://localhost:8080/users";

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.baseUrl}`);
  }

  getUser(username: string): Observable<User>{
    return this.http.get<User>(`${this.baseUrl}/${username}`, {observe: 'body'});
  }

  addUser(user: User) {
    return this.http.post(this.baseUrl, user, {observe: 'body'});
  }

  editUser(username: string, userData: User) {
    return this.http.put(`${this.baseUrl}/${username}`, userData);
  }
}
