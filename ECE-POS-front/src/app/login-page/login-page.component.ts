import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnDestroy {
  
  errorMessage: any = null;
  private destroy$ = new Subject<void>();
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(password: string): void {
    this.authService.login(password).pipe(takeUntil(this.destroy$)).subscribe((result) => {
      if (!result) {
        console.log(`password: ${password}`)
        this.errorMessage = 'Invalid password.';
      } else {
        this.router.navigate(['/order-form'])
      }
    }, (error) => {
      this.errorMessage = 'Authentication error. Please try again later.';
    });

/*
    if (this.authService.login(this.password)) {
      this.router.navigate(['/order-form']);
    }
*/
  }
}
