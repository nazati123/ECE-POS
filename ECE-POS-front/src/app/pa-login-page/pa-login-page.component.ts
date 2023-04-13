import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SuperAuthService } from '../superauth.service';

@Component({
  selector: 'app-pa-login-page',
  templateUrl: './pa-login-page.component.html',
  styleUrls: ['./pa-login-page.component.css']
})
export class PaLoginPageComponent {
  errorMessage: any = null;
  private destroy$ = new Subject<void>();
  username = '';
  password = '';

  constructor(private authService: SuperAuthService, private router: Router) {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(username: string, password: string): void {
    this.authService.login(username, password).pipe(takeUntil(this.destroy$)).subscribe((result) => {
      if (!result) {
        this.errorMessage = 'Invalid Credentials.';
      } else {
        this.router.navigate(['/dashboard'])
      }
    }, (error) => {
      this.errorMessage = 'Authentication error. Please try again later.';
    });

/*
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/dashboard']);
    }
*/
  }
}
