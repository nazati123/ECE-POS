import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order } from './order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private baseUrl = "http://localhost:8080/orders";

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]>{
    return this.http.get<Order[]>(`${this.baseUrl}`);
  }

  addOrder(order: Order) {
    return this.http.post(this.baseUrl, order, {observe: 'body'});
  }

  editOrder(orderId: number, formData: FormData | Order) {
    return this.http.put(this.baseUrl + orderId, formData);
  }
}
