import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { SuperAuthService } from './superauth.service';

@Injectable({
  providedIn: 'root'
})
export class SuperAuthGuard implements CanActivate {
    constructor(private authService: SuperAuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
      this.authService.checkAuthentication();
        if (!this.authService.isLoggedIn) {
          return this.router.createUrlTree(['/pa-login'], { queryParams: {returnUrl: state.url}});
        }
        return true;
    }
}