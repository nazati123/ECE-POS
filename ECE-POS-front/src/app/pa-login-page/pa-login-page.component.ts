import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SuperAuthService } from '../superauth.service';

@Component({
  selector: 'app-pa-login-page',
  templateUrl: './pa-login-page.component.html',
  styleUrls: ['./pa-login-page.component.css']
})
export class PaLoginPageComponent implements OnDestroy {
  errorMessage: any = null;
  private destroy$ = new Subject<void>();
  username = '';
  password = '';

  constructor(private authService: SuperAuthService, private router: Router) {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async onSubmit(username: string, password: string): Promise<void> {
    const login = await this.authService.login(username, password);
    login.pipe(takeUntil(this.destroy$)).subscribe((result) => {
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
