import { Ticket } from "./ticket.model"

export interface User {
    id?: number
    email: string
    tickets?: Ticket[]
    cacId: string
    firstName: string
    lastName: string
    phoneNum: string
}
