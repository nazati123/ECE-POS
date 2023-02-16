import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select'
import { MatDialogModule } from '@angular/material/dialog'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatInputModule } from '@angular/material/input'
import { CreateTicketDialogComponent } from './components/create-ticket-dialog/create-ticket-dialog.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatBadgeModule } from '@angular/material/badge';
import { UserTicketViewComponent } from './components/user-ticket-view/user-ticket-view.component';
import { DevTicketViewComponent } from './components/dev-ticket-view/dev-ticket-view.component';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakAngularModule } from 'keycloak-angular';



export function initializeKeycloak(keycloak: KeycloakService) {
  return () => keycloak.init({
      config: {
          url: 'http://localhost:8080',
          realm: 'helpdesk',
          clientId: 'helpdesk',
      },
      initOptions : {
          onLoad: 'check-sso',
          silentCheckSsoRedirectUri:
              window.location.origin + '/assets/silent-check-sso.html'
      }
  })
}

@NgModule({
  declarations: [
    AppComponent,
    CreateTicketDialogComponent,
    TicketListComponent,
    LandingPageComponent,
    UserTicketViewComponent,
    DevTicketViewComponent
  ],
  imports: [
    BrowserModule,
    KeycloakAngularModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    RouterModule.forRoot([])
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
