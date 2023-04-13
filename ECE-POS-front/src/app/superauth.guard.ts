import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SuperAuthService } from './superauth.service';

@Injectable({
  providedIn: 'root'
})
export class SuperAuthGuard implements CanActivate {
    constructor(private authService: SuperAuthService, private router: Router) {}

    canActivate(): boolean {
        if (!this.authService.isLoggedIn) {
          this.router.navigate(['/pa-login']);
          return false;
        }
        return true;
    }
}