import { TicketStatus } from "./ticket-status.model";
import { Ticket } from "./ticket.model";
import { User } from "./user.model";

export interface DevTicket {
    id?: number
    devUser?: User
    status?: TicketStatus
    ticket?: Ticket
    statusId: number 
    devId: number
    ticketId: number
}