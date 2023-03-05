import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { Order } from '../order';

@Component({
  selector: 'app-orders-dashboard',
  templateUrl: './orders-dashboard.component.html',
  styleUrls: ['./orders-dashboard.component.css']
})
export class OrdersDashboardComponent implements OnInit {
  orders: Order[] = [];

  constructor(private api: ApiServiceService) { }

  ngOnInit(): void {
    this.api.getOrders().subscribe((data: Order[]) => {
      console.log(data);
      this.orders = data;
    });
  }

}
