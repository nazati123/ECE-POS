import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy } from '@angular/core';
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
  returnUrl = '';

  constructor(private authService: SuperAuthService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin-panel';
  }

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
        this.router.navigateByUrl(this.returnUrl);
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
