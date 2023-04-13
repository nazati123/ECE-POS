import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;

  login(password: string): Observable<boolean> {
    if (password === 'password') {
      this.isLoggedIn = true;
      return of(true);
    }
    return of(false);
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}