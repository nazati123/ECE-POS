import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Item } from './item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private baseUrl = "http://localhost:8080/items";

  constructor(private http: HttpClient) { }

  getItems(order_id: number): Observable<Item[]>{
    return this.http.get<Item[]>(`${this.baseUrl}/${order_id}`);
  }

  addItem(item: Item, orderId: number | undefined) {
    item.orderId = orderId as number;
    return this.http.post(this.baseUrl, item as Item);
  }

  editItem(item: Item, orderId: number | undefined) {
    item.orderId = orderId as number;
    return this.http.put(`${this.baseUrl}/${item.id as number}`, item);
  }
}
