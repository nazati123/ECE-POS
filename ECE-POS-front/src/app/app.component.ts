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
  showLogoutButton: boolean;

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showLogoutButton = !(event.url.split('?')[0] === '/login' || event.url.split('?')[0] ==='/pa-login')
      }
    });
  }


  constructor(public authService: AuthService, public superAuthService: SuperAuthService, private router: Router) { 
    this.isSuperLoggedIn = this.superAuthService.isLoggedIn;
    this.isLoggedIn = this.authService.isLoggedIn || this.isSuperLoggedIn;
    this.showLogoutButton = false;
  }

  logout() {
    this.authService.logout();
    this.superAuthService.logout();
    this.isLoggedIn = false;
    this.isSuperLoggedIn = false;
    this.router.navigate(['/login']);
  }


}
