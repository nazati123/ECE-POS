import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = '/api/v1/users/'
  userType: number = 0
  

  constructor(private http: HttpClient) { } //Find a better way to access user types

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'id/' + userId)
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl)
  }

  getUserByCac(cacId: string): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'cac/' + cacId)
  }

  setUserType(userType: number) {
    this.userType = userType
  }

  getUserType(): number {
    return this.userType
  }

  createUser(user: User) {
    return this.http.post(this.baseUrl, user)
  }
}

