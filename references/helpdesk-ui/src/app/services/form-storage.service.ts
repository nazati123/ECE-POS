import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormStorageService {
  constructor() { }

  reason?: string
  subject?: string
  comment?: string
  userId?: number
  title?: string
  buttonText?: string
  attachments: File[] = []

  setReason(reason: string) {
    this.reason = reason
  }

  getReason(): string | undefined{
    return this.reason
  }

  setSubejct(subject: string) {
    this.subject = subject
  }

  getSubject(): string | undefined {
    return this.subject
  }

  setComment(comment: string) {
    this.comment = comment
  }

  getComment(): string | undefined{
    return this.comment
  }

  setUserId(userId: number) {
    this.userId = userId
  }

  getUserId(): number | undefined{
    return this.userId
  }

  getAttachments(): File[] {
    return this.attachments 
  }

  setAttachments(files: File[]) {
    this.attachments = files
  }
}
