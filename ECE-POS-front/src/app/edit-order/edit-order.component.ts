import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent {
  editing = true;
  orderId!: number;

  constructor(private currentRoute: ActivatedRoute) {

  }
  ngOnInit() {
    const id = parseInt(this.currentRoute.snapshot.paramMap.get('id')!, 10);
    if (!Number.isNaN(id)) {
      this.orderId = id;
    }
  }
}
