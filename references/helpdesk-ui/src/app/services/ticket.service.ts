import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ticket } from '../models/ticket.model';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { FileService } from './file.service';
import { DevTicket } from '../models/dev-ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  baseUrl = '/api/v1/tickets/'
  baseUrlRaw = '/api/v1/tickets/raw/'
  devBaseUrl = "/api/v1/dev_tickets/"

  constructor(private http: HttpClient) { }

  getTicketById(ticketId: number): Observable<Ticket> {
    return this.http.get<Ticket>(this.baseUrl + ticketId)
  }

  getAllTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.baseUrl)
  }

  addTicket(formData: FormData) {
    return this.http.post(this.baseUrl, formData)
  }

  editTicket(ticketId: number, formData: FormData | Ticket) {
    return this.http.put(this.baseUrl + ticketId, formData)
  }

  deleteTicket(ticketId: number): Observable<Ticket> {
    return this.http.delete<Ticket>(this.baseUrl + ticketId)
  }

  getTicketsByDev(devUserId: number): Observable<DevTicket[]> {
    console.log(this.devBaseUrl + 'assigned/' + devUserId)
    return this.http.get<DevTicket[]>(this.devBaseUrl + 'assigned/' + devUserId)
  }

  getAllDevTickets(): Observable<DevTicket[]> {
    return this.http.get<DevTicket[]>(this.devBaseUrl)
  }

  editDevTicket(devTicket: DevTicket) {
    console.log(devTicket)
    return this.http.put(this.devBaseUrl + devTicket!.id, devTicket)
  }

  //Using the raw unjoined version of the data to easily access the ids of things. Basically ducktape bc I have no idea what I'm doing
  getTicketByIdRaw(ticketId: number): Observable<Ticket> {
    return this.http.get<Ticket>(this.baseUrlRaw + ticketId)
  }
}