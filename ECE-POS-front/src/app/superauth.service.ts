import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SuperAuthService {
  isLoggedIn = false;

  login(username: string, password: string): Observable<boolean> {
    if (username === 'username' && password === 'password') {
      this.isLoggedIn = true;
      return of(true);
    }
    return of(false);
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}