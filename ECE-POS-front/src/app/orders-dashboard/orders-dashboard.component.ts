import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';
import { Order } from '../order';
import { filter } from 'rxjs';
import * as XLSX from 'xlsx';

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
        if (order.contactPerson?.trim().toLocaleLowerCase().includes(filterTerm.trim().toLocaleLowerCase()) )
        return order.contactPerson?.trim().toLocaleLowerCase().includes(filterTerm.trim().toLocaleLowerCase());
        if (order.requestPerson?.trim().toLocaleLowerCase().includes(filterTerm.trim().toLocaleLowerCase()) )
        return order.requestPerson?.trim().toLocaleLowerCase().includes(filterTerm.trim().toLocaleLowerCase());
        if (order.phoneNumber?.trim().toLocaleLowerCase().includes(filterTerm.trim().toLocaleLowerCase()) )
        return order.phoneNumber?.trim().toLocaleLowerCase().includes(filterTerm.trim().toLocaleLowerCase());
        if (order.dateCreated?.trim().toLocaleLowerCase().includes(filterTerm.trim().toLocaleLowerCase()) )
        return order.dateCreated?.trim().toLocaleLowerCase().includes(filterTerm.trim().toLocaleLowerCase());
        if (this.computeStatus(order).trim().toLocaleLowerCase().includes(filterTerm.trim().toLocaleLowerCase()) )
        return this.computeStatus(order).trim().toLocaleLowerCase().includes(filterTerm.trim().toLocaleLowerCase());
        if (order.id?.toString().trim().toLocaleLowerCase().includes(filterTerm.trim().toLocaleLowerCase()) )
        return order.id?.toString().trim().toLocaleLowerCase().includes(filterTerm.trim().toLocaleLowerCase());
        


        return;
      })
    
  }
  }

  exportexcel(): void
  {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    const cols: any = XLSX.utils.sheet_to_json(ws, { header: 1 }).slice(1)


    const sum = cols.slice(1).reduce((acc: string, val: string[]) => parseFloat(acc) + parseFloat(val[6]), 0);
    XLSX.utils.sheet_add_aoa(ws, [[null, null, null, null, null, null, sum]], { origin: -1 })
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, "Group-Orders.xlsx");
 
  }

  computeStatus(order : Order) {
    if(order.isCompleted) {
      return "Completed";
    }
    else if (order.tracking) {
      return "Shipped";
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
