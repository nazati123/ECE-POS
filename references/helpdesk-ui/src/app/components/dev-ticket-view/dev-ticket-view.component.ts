import { Component, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DevTicket } from 'src/app/models/dev-ticket.model';
import { Ticket } from 'src/app/models/ticket.model';
import { User } from 'src/app/models/user.model';
import { FileService } from 'src/app/services/file.service';
import { TicketService } from 'src/app/services/ticket.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dev-ticket-view',
  templateUrl: './dev-ticket-view.component.html',
  styleUrls: ['./dev-ticket-view.component.css']
})
export class DevTicketViewComponent implements OnInit {
  @Input() devTicket!: DevTicket
  @Input() user!: User
  @Input() userRole!: string
  @Input() canResolve!: boolean 
  @Input() canPickup!: boolean 
  @Output() pickedUp = new EventEmitter()

  ticket!: Ticket
  numberOfFiles: number = 0
  retrievedImages: any[] = []
  isLoaded!: Promise<boolean>;
  pickUpButtonText = 'Pick up ticket'
  buttonDisabled: boolean = false
  hidden: boolean = false

  constructor(private ticketService: TicketService, private fileService: FileService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.canResolve = this.devTicket.status?.id === 2 || this.devTicket.status?.id === 3
    this.ticket = this.devTicket.ticket!
    this.isLoaded = Promise.resolve(true)
  }

  getComment(comment?: string): string {
    return comment != 'null' ? comment! : 'No comment'
  }

  getImages() {
    this.retrievedImages = []
    this.numberOfFiles = 0
    if (this.ticket.files && this.ticket.files.length > 0) {
      this.numberOfFiles = this.ticket.files.length
      for (let file of this.ticket.files) {
        this.fileService.getFile(file.id).subscribe((data:Blob) => {
          const reader = new FileReader()
          reader.readAsDataURL(data)
          reader.onloadend = () => {
            this.retrievedImages.push(this.sanitizer.bypassSecurityTrustUrl(reader.result as string))
          }
        })
      }
    }
  }

  pickUpTicket() {
    this.pickUpButtonText = 'Picked Up'
    this.buttonDisabled = true

    let devTicket: DevTicket = {
      id: this.devTicket.id,
      statusId: 2,
      devId: this.user.id!,
      ticketId: this.ticket.id!
    }
    this.ticketService.editDevTicket(devTicket).subscribe()

    setTimeout(() => {  //May be an issue if the database takes too long.
      this.pickedUp.emit('picked up')
      this.hidden = true
    }, 1000)
  }

  resolveTicket() {
    this.ticket.active = false
    this.devTicket.statusId = 4
    let ticket: Ticket = {
      subject: this.ticket.subject,
      comment: this.ticket.comment,
      reasonId: this.ticket.reason?.id,
      userId: this.ticket.userId,
      url: this.ticket.url,
      active: this.ticket.active
    }
    this.ticketService.editTicket(this.ticket.id!, ticket).subscribe()

    let devTicket: DevTicket = {
      id: this.devTicket.id,
      statusId: this.devTicket.statusId,
      devId: this.user.id!,
      ticketId: this.ticket.id!
    }
    this.ticketService.editDevTicket(devTicket).subscribe()
  }
}