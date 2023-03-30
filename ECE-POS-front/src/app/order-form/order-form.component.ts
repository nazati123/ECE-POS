import { Component, Input, OnInit, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'
import { Order } from '../order';
import { Faculty } from '../faculty';
import { Item } from '../item';
import { OrdersService } from '../orders.service';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  @Input() approving = false;
  @Input() approvingId?: Number;

  orderForm!: FormGroup;
  currentDateTime: string | null;
  viewing = false;

  constructor(private fb: FormBuilder, private datepipe: DatePipe, private ordersService: OrdersService,
              private itemsService: ItemsService, private router: Router, private currentRoute: ActivatedRoute) {
    this.currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy');
  }

  ngOnInit() {
    this.orderForm = this.fb.group({
      id: [],
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
      phone: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)]],
      email: ['', [Validators.required, Validators.email]],
      room: ['', Validators.required],
      purpose: ['', [Validators.required, Validators.maxLength(250)]],
      items: this.fb.array([]),
      shippingTotal: [0, [Validators.required, Validators.min(0)]],
      totalCost: [0, [Validators.required, Validators.min(0)]],
      isStandingContract: ['', Validators.required],
      facultyEmails: ['', Validators.required],
      isAuthorized: ['', Validators.required]
    });

    this.checkViewing();
    if(!this.approving && !this.viewing) {
      this.enableCalculations();
      this.items.push(this.item());
    }
  }

  checkViewing() {
    const id = parseInt(this.currentRoute.snapshot.paramMap.get('id')!, 10);
    if (!Number.isNaN(id)) {
      this.viewing = true;
      this.ordersService.getOrder(id).subscribe(order => {
        this.orderForm.patchValue(order);
        order['items']?.forEach(item => {
          this.items.push(this.item(item as Item));
        });
      });
    }
    else if (this.approving == true) {
      this.viewing = true;
      this.ordersService.getOrder(this.approvingId as number).subscribe(order => {
        this.orderForm.patchValue(order);
        order['items']?.forEach(item => {
          this.items.push(this.item(item as Item));
        });
      });
    }
  }

  enableCalculations() {
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

  item(item? : Item): FormGroup {
    return this.fb.group({
      quantity: [item?.quantity, [Validators.required, Validators.min(0)]],
      partNumber: [item?.partNumber, Validators.required],
      description: [item?.description, Validators.required],
      price: [item?.price, [Validators.required, Validators.min(0)]],
      total: [item?.total]
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
    return [{'name': 'Trevor', 'email': 'twrussell@crimson.ua.edu'}, {'name': 'Matt', 'email': 'mjpoirier@crimson.ua.edu'}, {'name': 'Nate', 'email': 'nlpurcell@crimson.ua.edu'}, {'name': 'Joey', 'email': 'jmruzicka@crimson.ua.edu'}];
  }

  approversList: Faculty[] = this.getApprovers();

  onSubmit() {
    if(!this.approving) {
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
        purpose: this.orderForm.value.purpose,
        invoiceEmail: this.orderForm.value.invoiceEmail
      }
      let items: Item[] = this.orderForm.value.items as Item[];
      
      this.ordersService.addOrder(newOrder).subscribe(data => {
        let orderResponse = data as Order;
        items.forEach(element => {
          this.itemsService.addItem(element, orderResponse.id).subscribe();
        });
      });
      this.router.navigate(['/dashboard']);
    }
    else {
      let newOrder = this.orderForm.getRawValue() as Order;
      this.ordersService.editOrder(newOrder.id as number, newOrder).subscribe();
    }
}
}
