import { Item } from './item';

export interface Order {
    id?: number;
    dateCreated?: string;
    accountNumber?: number;
    grantEndDate?: string;
    requestPerson?: string;
    phone?: string;
    email?: string;
    room?: string;
    facultyEmails?: string;
    isStandingContract?: boolean;
    isAuthorized?: boolean;
    isOrdered?: boolean;
    isCompleted?: boolean;
    tracking?: string;
    shippingTotal?: number;
    totalCost?: number;
    name?: string;
    address?: string;
    url?: string;
    phoneNumber?: string;
    faxNumber?: string;
    contactPerson?: string;
    dateAuthorized?: string;
    dateOrdered?: string;
    dateCompleted?: string;
    purpose?: string;
    invoiceEmail?: string;
    items?: Item[];
    isStudentForm?: boolean;
    groupId?: string;
    approvedBy?: string
}