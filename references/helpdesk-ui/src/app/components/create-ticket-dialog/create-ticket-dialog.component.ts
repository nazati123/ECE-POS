import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Ticket } from 'src/app/models/ticket.model';
import { User } from 'src/app/models/user.model';
import { FileService } from 'src/app/services/file.service';
import { FormStorageService } from 'src/app/services/form-storage.service';
import { ReasonService } from 'src/app/services/reason.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-create-ticket-dialog',
  templateUrl: './create-ticket-dialog.component.html',
  styleUrls: ['./create-ticket-dialog.component.css']
})
export class CreateTicketDialogComponent implements OnInit {
  reasons = new Map<number, string>()
  isLoaded!: Promise<boolean>;
  reasonValue?: number
  ticket!: Ticket
  files: File[] = []
  fileUrls: string[] = []
  formData: FormData = new FormData()
  retrievedImages: any[] = []
  canDeleteFile: boolean = true

  createTicketForm!: FormGroup
  subject!: FormControl
  comment!: FormControl
  reasonId!: FormControl
  fileInput?: FormControl
  userId?: number;

  title: string = 'Create New Ticket'
  buttonText: string = 'Submit'
  fileTitle: string = 'File Preview: '
  fileName: string = ''

  editMode: boolean = false

  constructor(private ticketService: TicketService, private reasonService: ReasonService, private router: Router, @Inject(MAT_DIALOG_DATA) public data: {user: User, editing: boolean, whichTicket: number}, public dialog: MatDialog, private storage: FormStorageService, private http: HttpClient, private fileService: FileService, private sanitizer: DomSanitizer, public dialogRef: MatDialogRef<CreateTicketDialogComponent>) { }

  ngOnInit(): void {
    this.initTicket()
    this.convertToEditTicketForm()
  }

  onSubmit(form: NgForm) {
    if (!this.editMode) {
      this.ticketService.addTicket(this.createTicketFormData() as FormData).subscribe()
    } else {
      this.ticketService.editTicket(this.ticket.id!, this.editTicket()!).subscribe()
    }
    this.dialog.closeAll()
  }

  initTicket() {
    this.reasons = this.reasonService.getAllReasons()

    this.createTicketForm = new FormGroup({
      reasonId: new FormControl(this.storage.getReason(), Validators.required),
      subject: new FormControl(this.storage.getSubject(), Validators.required),
      comment: new FormControl(this.storage.getComment()),
      fileInput: new FormControl('', tooManyFilesValidator())
    })

    this.userId = this.data.user.id
    this.editMode = this.data.editing
    this.title = this.editMode === true ? 'Edit Ticket' : 'Create New Ticket'

    this.createTicketForm.get('reasonId')!.valueChanges.subscribe(change => {
      this.storage.setReason(change)
    })
    this.createTicketForm.get('subject')!.valueChanges.subscribe(change => {
      this.storage.setSubejct(change)
    })
    this.createTicketForm.get('comment')!.valueChanges.subscribe(change => {
      this.storage.setComment(change)
    })
  }

  createTicketFormData(): FormData {
    this.formData.append('reasonId', this.createTicketForm.controls['reasonId'].value)
    this.formData.append('userId', this.data.user.id!.toString())
    this.formData.append('subject', this.createTicketForm.controls['subject'].value)
    this.formData.append('comment', this.createTicketForm.controls['comment'].value)
    this.formData.append('url', this.router.url)

    for (let file of this.files) {
      this.formData.append('file', file, file.name)
    }
    return this.formData
  }

  editTicket(): Ticket | null {
    if (this.editMode) {  //Need to make way for users to delete the files they uploaded
      let ticket: Ticket = {
        subject: this.createTicketForm.controls['subject'].value,
        comment: this.createTicketForm.controls['comment'].value,
        url: this.router.url,
        reasonId: Number(this.createTicketForm.controls['reasonId'].value),
        active: true,
        userId: this.userId
      }
      return ticket
    }
    return null
  }

  convertToEditTicketForm() {
    if (this.editMode) {
      this.buttonText = 'Submit Changes'
      this.canDeleteFile = false
      this.ticketService.getTicketById(this.data.whichTicket).subscribe((data) => {
        this.ticket = data
        this.createTicketForm.patchValue({
          reasonId: this.ticket.reason!.id, 
          subject: this.ticket!.subject,
          comment: this.ticket!.comment,
          fileInput: this.fileUrls
        })
        this.reasonValue = this.ticket.reason!.id
        this.getImages(this.data.whichTicket)
        this.fileUrls = this.retrievedImages
        this.fileTitle = 'Uploaded Files:'
      })
    }
  }

  getImages(ticketId: number) {
    this.retrievedImages = []
    this.ticketService.getTicketById(ticketId).subscribe(ticket => {
      if (ticket.files!.length > 0) {
        for (let i = 0; i < ticket.files!.length; i++) {
          this.fileService.getFile(ticket.files![i].id).subscribe((data:Blob) => {
            const reader = new FileReader()
            reader.readAsDataURL(data)
            reader.onloadend = () => {
              this.retrievedImages.push(this.sanitizer.bypassSecurityTrustUrl(reader.result as string))
            }
          })
        }
      }
    })
  }

  closeModal() {
    this.dialog.closeAll()
    this.storage.setReason('')
    this.storage.setSubejct('')
    this.storage.setComment('')
    this.storage.setAttachments([])
  }

  onFileChange(event:any) {
    let fileList: File[] = Array.from(event.target.files)
    let splicedArray: File[] = []
    if (fileList.length > 0) {
      if (this.files.length === 0) {
        for (let file of fileList) {
          this.files.push(file)
          //this.formData.append('file', file, file.name)
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = () => {
            this.fileUrls.push(reader.result as string)
          }
        }
      } else {
        for (let file of this.files) {
          for (let inputFile of fileList) {
            if (file.name === inputFile.name) {
              let deleteIndex = fileList.findIndex(funcFile => funcFile.name === file.name)
              fileList.splice(deleteIndex, 1)
              splicedArray = fileList
            } else {
              splicedArray = fileList
            }
          }
        }
        for (let file of splicedArray!) {
          this.files.push(file)
          //this.formData.append('file', file, file.name)
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = () => {
            this.fileUrls.push(reader.result as string)
          }
        }
      }
    } 
    this.createTicketForm.get('fileInput')?.setValue(this.files)
  }

  removeFile(fileUrl: string) {
    let deleteFileIndex = this.files.findIndex(file => file.name === fileUrl)
    this.files.splice(deleteFileIndex, 1)
    let deleteUrlIndex = this.fileUrls.findIndex(url => url === fileUrl)
    this.fileUrls.splice(deleteUrlIndex, 1)
    this.createTicketForm.get('fileInput')?.setValue(this.files)
  }
}

export function tooManyFilesValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const numberOfFiles = control.value.length

    if (!numberOfFiles) return null

    return numberOfFiles > 3 ? {tooManyFiles: 'too many files'} : null
  }
}