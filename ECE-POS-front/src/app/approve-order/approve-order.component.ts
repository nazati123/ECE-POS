import { Component } from '@angular/core'
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'
import { Order } from '../order';
import { OrderFormComponent } from '../order-form/order-form.component';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-approve-order',
  templateUrl: './approve-order.component.html',
  styleUrls: ['./approve-order.component.css']
})
export class ApproveOrderComponent {
  approving = true;
  orderId!: number;

  constructor(private router: Router, private currentRoute: ActivatedRoute, private ordersService: OrdersService) {

  }
  ngOnInit() {
    const id = parseInt(this.currentRoute.snapshot.paramMap.get('id')!, 10);
    if (!Number.isNaN(id)) {
      this.orderId = id;
    }
  }
}
