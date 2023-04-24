import * as bcrypt from 'bcryptjs';

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { UsersService } from './users.service';
import { User } from './user';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SuperAuthService {
  isLoggedIn = false;
  validUser = false;

  constructor(private usersService: UsersService, private router: Router) {
    this.checkAuthentication();
   }

  async login(username: string, password: string): Promise<Observable<boolean>> {
    if (username === 'orderform') {
      console.log('nice try.');
      return of(false);
    }

    const userSubject = new Subject<User>();
    let success = false;

    this.usersService.getUser(username).subscribe(user => {
      console.log('await');
      this.validUser = true;
      userSubject.next(user);
      userSubject.complete();
    }, error => {
      console.log('could not fetch user.');
      this.validUser = false;
      this.router.navigate(['/pa-login']);
    });
    
    return new Promise((resolve, reject) => {
      userSubject.pipe(take(1)).subscribe (user => {
        const correct_username = user.username;
        const correct_password = user.password;

        if (!this.validUser) {
          console.log('invalid user');
          resolve(of(false))
        }

        success = (correct_username === username) && (bcrypt.compareSync(password, correct_password))
        if (success) {
          console.log('correct');
          localStorage.setItem('superAuthData', JSON.stringify(user.password));
          this.isLoggedIn = true;
        }
        else {
          console.log('authentication failed.')
          this.router.navigate(['/pa-login'])
        }
        resolve(of(success))
      }, error => {
        console.log('error in  auth Promise');
        this.router.navigate(['/pa-login']);
        reject(error);
      })
    })
  }

  public checkAuthentication(): void {
    const authData = localStorage.getItem('superAuthData');
    if (authData) {
      this.isLoggedIn = true;
    }
  }

  logout(): void {
    localStorage.removeItem('superAuthData');
    this.isLoggedIn = false;
  }
}