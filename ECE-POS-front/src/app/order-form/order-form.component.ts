import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent {
  orderForm = this.fb.group({
    date: [''],
    invoiceEmail: [''],
    company: this.fb.group({
      companyName: [''],
      companyAddress: [''],
      companyURL: [''],
      companyPhone: [''],
      companyFax: [''],
      companyContact: ['']
    }),
    accountNum: [''],
    endDate: [''],
    requesterName: [''],
    requesterPhone: [''],
    requesterEmail: [''],
    room: [''],
    purpose: [''],
    items: this.fb.array([
      this.fb.control(''),
    ]),
    shipping: [''],
    total: [''],
    standingContract: [''],
    approvers: ['']
  });

  get items() {
    return this.orderForm.get('items') as FormArray;
  }

  constructor(private fb: FormBuilder) { }

  addItem() {
    this.items.push(this.fb.control(''));
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.orderForm.value);
  }
}
