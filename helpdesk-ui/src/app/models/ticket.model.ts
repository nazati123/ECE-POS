import { Reason } from "./reason.model"
import { User } from "./user.model"

export interface Ticket { 
    id?: number
    subject: string
    comment: string
    url: string
    reason?: Reason
    userId?: number
    timeStamp?: string
    active?: boolean
    files?: any[]
    reasonId?: number
}


