import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';
import { Order } from '../order';
import { filter } from 'rxjs';

@Component({
  selector: 'app-orders-dashboard',
  templateUrl: './orders-dashboard.component.html',
  styleUrls: ['./orders-dashboard.component.css']
})
export class OrdersDashboardComponent implements OnInit {
  orders: Order[] = [];
  _filterText : string = '';
  filteredOrders!: Order[]; // list that holds filter

  constructor(private api: OrdersService) { }

  get filterText(){
    return this._filterText;
  }

  
  set filterText(value: string){
    this._filterText = value;
    this.filteredOrders = this.filterOrderByContact(value);
  }

  ngOnInit(): void {
    this.api.getOrders().subscribe((data: Order[]) => {
      // console.log(data);
      this.orders = data;
      this.filteredOrders = this.orders;
    });
  }

  filterOrderByContact(filterTerm: string){
    if(this.orders.length === 0 || this.filterText === ''){
      return this.orders;
  } else {
      return this.orders.filter((order) => 
      { 
          return order.contactPerson?.toLowerCase() === filterTerm.toLowerCase();
          return order.requestPerson?.toLowerCase() === filterTerm.toLowerCase();
          
      })
  }
  }

  computeStatus(order : Order) {
    if(order.isCompleted) {
      return "Completed";
    }
    else if (order.isOrdered) {
      return "Ordered";
    }
    else if (order.isAuthorized) {
      return "Authorized";
    }
    else {
      return "Submitted";
    }
  }

}
