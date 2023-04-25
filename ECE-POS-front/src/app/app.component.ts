import { AuthService } from './auth.service';
import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SuperAuthService } from './superauth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ECE-POS-front';
  isLoggedIn: boolean;
  isSuperLoggedIn: boolean;
  notLoginPage: boolean;
  sidebarPage: boolean;

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.notLoginPage = !(event.url.split('?')[0] === '/login' || event.url.split('?')[0] ==='/pa-login' || event.url === '/');
        this.sidebarPage = (event.url.split('?')[0] === '/order-form' && this.isSuperLoggedInFunc) || (event.url.split('?')[0] !== '/order-form' && this.notLoginPage);
      }
    });
  }


  constructor(public authService: AuthService, public superAuthService: SuperAuthService, private router: Router) { 
    this.isSuperLoggedIn = this.superAuthService.isLoggedIn;
    this.isLoggedIn = this.authService.isLoggedIn || this.isSuperLoggedIn;
    this.notLoginPage = false;
    this.sidebarPage = false;
  }
  
  get isSuperLoggedInFunc(): boolean {
    return this.superAuthService.isLoggedIn;
  }

  logout() {
    this.authService.logout();
    this.superAuthService.logout();
    this.isLoggedIn = false;
    this.isSuperLoggedIn = false;
    this.router.navigate(['/login']);
  }


}
