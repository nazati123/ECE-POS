import * as bcrypt from 'bcryptjs';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UsersService } from './users.service';
import { User } from './user';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;

  constructor(private usersService: UsersService, private router: Router) { }

  async login(password: string): Promise<Observable<boolean>>{
    const userSubject = new Subject<User>();
    let success = false;

    this.usersService.getUser('orderform').subscribe(user => {
      console.log(user);
      userSubject.next(user);
      userSubject.complete();
    }, error => {
      console.log('could not fetch user.');
      this.router.navigate(['/login']);
    });

    return new Promise((resolve, reject) => {
      userSubject.pipe(take(1)).subscribe (user => {
        const correct_username = user.username;
        const correct_password = user.password;

        success = (correct_username === 'orderform') && (bcrypt.compareSync(password, correct_password))
        if (success) {
          this.isLoggedIn = true;
        }
        else {
          console.log('authentication failed.')
          this.router.navigate(['/login'])
        }
        resolve(of(success))
      }, error => {
        console.log('error in  auth Promise');
        this.router.navigate(['/login']);
        reject(error);
      })
    })

/*
    if (password === 'password') {
      this.isLoggedIn = true;
      return of(true);
    }
    return of(false);
*/
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}