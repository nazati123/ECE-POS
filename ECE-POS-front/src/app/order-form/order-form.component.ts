import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order } from '../order';
import { Faculty } from '../faculty'
import { Item } from '../item';
import { OrdersService } from '../orders.service';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  orderForm!: FormGroup;
  submitted = false;
  currentDateTime: string | null;

  constructor(private fb: FormBuilder, private datepipe: DatePipe, private ordersService: OrdersService, private itemsService: ItemsService) {
    this.currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy');
  }

  ngOnInit() {
    this.orderForm = this.fb.group({
      dateCreated: [this.currentDateTime, Validators.required],
      invoiceEmail: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      address: ['', Validators.required],
      url: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)]],
      faxNumber: ['', Validators.pattern(/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)],
      contactPerson: [''],
      accountNumber: ['', Validators.required],
      grantEndDate: ['', Validators.required],
      requestPerson: ['', Validators.required],
      phone: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
      email: ['', [Validators.required, Validators.email]],
      room: ['', Validators.required],
      purpose: ['', Validators.required],
      items: this.fb.array([this.item()]),
      shippingTotal: [0, Validators.required],
      totalCost: [0, Validators.required],
      isStandingContract: ['', Validators.required],
      facultyEmails: ['', Validators.required]
    });

    this.orderForm.get("items")?.valueChanges.subscribe(selectedValue => {
      this.calculate();
    }) 
    this.orderForm.get("shippingTotal")?.valueChanges.subscribe(selectedValue => {
      this.calculate();
    }) 
  }

  get items() {
    return this.orderForm.get('items') as FormArray;
  }

  get f() { return this.orderForm.controls; }

  addItem() {
    this.items.push(this.item());
  }
  removeItem(index: number) {
    this.items.removeAt(index);
  }

  item(): FormGroup {
    return this.fb.group({
      quantity: [''],
      partNumber: [''],
      description: [''],
      price: [''],
      total: ['']
    });
  }

  calculate() {
    let newTotal = 0;
    for (let i = 0; i < this.items.length; i++){
      const itemTotal = (this.items.at(i).get('quantity')?.value || 0) * (this.items.at(i).get('price')?.value || 0);
      this.items.at(i).get('total')?.setValue(itemTotal, {emitEvent: false})
      newTotal += itemTotal;
    }
    newTotal += this.orderForm.get('shippingTotal')?.value || 0;
    this.orderForm.get('totalCost')?.setValue(newTotal, {emitEvent: false})
  }

  getApprovers() {
    return [{'name': 'Dr. Ricks', 'email': 'kricks@eng.ua.edu'}, {'name': 'Dr. Taylor', 'email': 'dtaylor@eng.ua.edu'}];
  }

  approversList: Faculty[] = this.getApprovers();

  onSubmit() {
    let newOrder: Order = {
      dateCreated: new Date().toISOString(),
      accountNumber: this.orderForm.value.accountNumber,
      grantEndDate: new Date(this.orderForm.value.grantEndDate).toISOString(),
      requestPerson: this.orderForm.value.requestPerson,
      phone: this.orderForm.value.phone.replace(/\D+/g, ""),
      email: this.orderForm.value.email,
      room: this.orderForm.value.room,
      facultyEmails: this.orderForm.value.facultyEmails.toString(),
      isStandingContract: this.orderForm.value.isStandingContract,
      isAuthorized: false,
      isOrdered: false,
      isCompleted: false,
      tracking: "",
      shippingTotal: this.orderForm.value.shippingTotal,
      totalCost: this.orderForm.value.totalCost,
      name: this.orderForm.value.name,
      address: this.orderForm.value.address,
      url: this.orderForm.value.url,
      phoneNumber: this.orderForm.value.phoneNumber.replace(/\D+/g, ""),
      faxNumber: this.orderForm.value.faxNumber.replace(/\D+/g, ""),
      contactPerson: this.orderForm.value.contactPerson,
      // dateAuthorized: '',
      // dateOrdered: '',
      // dateCompleted: ''
    }
    let items: Item[] = this.orderForm.value.items as Item[];
    
    console.log(newOrder);
    console.log(items);
    this.ordersService.addOrder(newOrder).subscribe(data => {
      let orderResponse = data as Order;
      items.forEach(element => {
        this.itemsService.addItem(element, orderResponse.id).subscribe(data => {
          console.log(data);
        });
      });
    });
    
    


    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.orderForm.value, null, 4));
}
}
