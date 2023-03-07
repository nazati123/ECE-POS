import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  @Input() user!: User
  @Input() userRoles!: string[]
  isRole: boolean[] = [false, false, false]
  text: string = 'Select'
  isLoaded!: Promise<boolean>

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {

    this.isRole[0] = this.userRoles.includes('app-user')
    this.isRole[1] = this.userRoles.includes('app-admin')
    this.isRole[2] = this.userRoles.includes('app-dev')

    this.getUserRole()
  }

  getUserRole(): string {
    if (this.isRole[2] === true) return 'app-dev'
    else if (this.isRole[1] === true) return 'app-admin'
    else if (this.isRole[0] === true) return 'app-user'
     else return ''
  }
}
