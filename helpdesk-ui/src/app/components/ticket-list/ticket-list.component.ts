import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionPanel } from '@angular/material/expansion';
import { DevTicket } from 'src/app/models/dev-ticket.model';
import { Ticket } from 'src/app/models/ticket.model';
import { User } from 'src/app/models/user.model';
import { TicketService } from 'src/app/services/ticket.service';
import { UserService } from 'src/app/services/user.service';
import { CreateTicketDialogComponent } from '../create-ticket-dialog/create-ticket-dialog.component';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css'],
  viewProviders: [MatExpansionPanel]
})
export class TicketListComponent implements OnInit {
  numberOfFiles?: number
  retrievedImages: any[] = []
  isLoaded!: Promise<boolean>;

  @Input() user?: User
  @Input() userRole?: string
  pickedTickets: DevTicket[] = []
  availableTickets: DevTicket[] = []
  allDevTickets: DevTicket[] = []
  userTickets: Ticket[] = []
  ticketCreator!: User
  canResolve: boolean = false
  canPickup: boolean = false
  
  constructor(private ticketService: TicketService, private dialog: MatDialog, private userService: UserService) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    switch (this.userRole) {
      case 'app-user': 
        this.getUserTickets()
      break
      case 'app-dev': 
        this.getAllActiveDevTickets()
        this.getPickedUpTickets()
      break
      case 'app-admin': 
        this.getAllDevTickets()
      break
    }
  }

  createTicket() {
    let dialogRef = this.dialog.open(CreateTicketDialogComponent, {
      width: '800px',
      data: {user: this.user},
      disableClose: true
    })
    dialogRef.afterClosed().subscribe((data) => {
      this.refreshUserTickets()
    })
  }


  getAllActiveDevTickets() {
    this.ticketService.getAllDevTickets().subscribe((devTickets) => {
      for (let devTicket of devTickets) {
        if (devTicket.status?.id === 1) {
          this.availableTickets?.push(devTicket)
        }
      }
      this.isLoaded = Promise.resolve(true)
    })
    this.canPickup = true
  }

  getAllDevTickets() {
    this.ticketService.getAllDevTickets().subscribe((devTickets) => {
      this.allDevTickets = devTickets
      this.isLoaded = Promise.resolve(true)
    })
  }

  getUserTickets() {
    if (this.user?.tickets) {
      for (let ticket of this.user.tickets) {
        this.userTickets?.push(ticket)
      }
    }
    this.isLoaded = Promise.resolve(true)
  }

  refreshUserTickets() {
    this.userService.getUserById(this.user!.id!).subscribe(user => {
      this.userTickets = user.tickets!
    })
  }

  getPickedUpTickets() {
    this.pickedTickets = []
    if (this.user) {
      this.ticketService.getTicketsByDev(this.user.id!).subscribe((pickedUpTickets) => { 
        for (let pickedTicket of pickedUpTickets) {
          if (pickedTicket.ticket?.active === true && pickedTicket.status?.id != 4) {
            this.pickedTickets!.push(pickedTicket)
          }
        }
        this.isLoaded = Promise.resolve(true)
      })
    }
    this.canResolve = true
  }
}
