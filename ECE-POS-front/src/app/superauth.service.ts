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

  constructor(private usersService: UsersService, private router: Router) { }

  async login(username: string, password: string): Promise<Observable<boolean>> {
    if (username === 'orderform') {
      console.log('nice try.');
      return of(false);
    }

    const userSubject = new Subject<User>();
    let success = false;

    this.usersService.getUser(username).subscribe(user => {
      this.validUser = true;
      userSubject.next(user);
      userSubject.complete();
    }, error => {
      console.log('could not fetch user.');
      this.validUser = false;
      this.router.navigate(['/pa-login']);
    });
    if (!this.validUser) {
      return of(false)
    }
    
    return new Promise((resolve, reject) => {
      userSubject.pipe(take(1)).subscribe (user => {
        const correct_username = user.username;
        const correct_password = user.password;

        success = (correct_username === username) && (correct_password === password)
        if (success) {
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



/*    
    if (username === 'username' && password === 'password') {
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