import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { catchError } from 'rxjs';
import { User } from './models/user.model';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  isLoggedIn = false
  userProfile: KeycloakProfile | null = null
  private userCacId: string = ''
  user!: User
  userRoles!: string[]
  dataIsLoaded!: Promise<boolean>

  constructor(private readonly keycloak: KeycloakService, private userService: UserService) {}

  public async ngOnInit() {
    this.isLoggedIn = await this.keycloak.isLoggedIn()

    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile()
      this.userCacId = this.userProfile.username!
      this.userRoles = this.keycloak.getKeycloakInstance().realmAccess!.roles

      let user: User = {
        email: this.userProfile?.email!,
        cacId: this.userCacId,
        firstName: this.userProfile?.firstName!,
        lastName: this.userProfile?.lastName!,
        phoneNum: this.userProfile?.attributes?.phoneNum[0],
      }

      this.userService.createUser(user).pipe(catchError(err => {throw 'User in database already!'})).subscribe()

      setTimeout(() => {
        this.userService.getUserByCac(this.userCacId).subscribe({
          next: (user: User) => {
            this.user = user
            this.dataIsLoaded = Promise.resolve(true)
          }
        })
      }, 1000)
    }
  }

  public login() {
    this.keycloak.login()
  }

  public logout() {
    this.keycloak.logout()
  }
}
