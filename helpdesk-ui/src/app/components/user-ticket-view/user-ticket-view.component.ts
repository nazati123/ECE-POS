import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Ticket } from 'src/app/models/ticket.model';
import { User } from 'src/app/models/user.model';
import { FileService } from 'src/app/services/file.service';
import { TicketService } from 'src/app/services/ticket.service';
import { CreateTicketDialogComponent } from '../create-ticket-dialog/create-ticket-dialog.component';

@Component({
  selector: 'app-user-ticket-view',
  templateUrl: './user-ticket-view.component.html',
  styleUrls: ['./user-ticket-view.component.css']
})
export class UserTicketViewComponent implements OnInit {
  @Input() ticket!: Ticket
  @Input() user!: User

  @Output() edited = new EventEmitter()

  numberOfFiles: number = 0
  retrievedImages: any[] = []
  isEditForm: boolean = true

  constructor(private ticketService: TicketService, private fileService: FileService, private sanitizer: DomSanitizer, public dialog: MatDialog) { }

  ngOnInit(): void { 
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

  deleteTicket() {
    this.ticket.active = false
    let ticket: Ticket = {
      userId: this.user.id!,
      reasonId: this.ticket.reason?.id,
      subject: this.ticket.subject,
      comment: this.ticket.comment,
      url: this.ticket.url,
      active: false
    }
    this.ticketService.editTicket(this.ticket.id!, ticket).subscribe()
  }

  openDialogue(ticketId: number) {
    console.log(ticketId)
    const dialogRef = this.dialog.open(CreateTicketDialogComponent, {
      width: '800px',
      data: { user : this.user, editing : this.isEditForm, whichTicket: ticketId }
    })
    dialogRef.afterClosed().subscribe((rel) => {
      this.edited.emit('closed')
    })
  }
}
