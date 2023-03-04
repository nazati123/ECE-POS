import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  orderForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.orderForm = this.fb.group({
      date: ['', Validators.required],
      invoiceEmail: ['', Validators.required, Validators.email],
      company: this.fb.group({
        companyName: ['', Validators.required],
        companyAddress: ['', Validators.required],
        companyURL: ['', Validators.required],
        companyPhone: ['', Validators.required, Validators.pattern(/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)],
        companyFax: [''],
        companyContact: ['']
      }),
      accountNum: ['', Validators.required],
      endDate: ['', Validators.required],
      requesterName: ['', Validators.required],
      requesterPhone: ['', Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')],
      requesterEmail: ['', Validators.required],
      room: ['', Validators.required],
      purpose: ['', Validators.required],
      items: this.fb.array([
        this.fb.control(''),
      ]),
      shipping: ['', Validators.required],
      total: ['', Validators.required],
      standingContract: ['', Validators.required],
      approvers: ['', Validators.required]
    });

    this.orderForm.get("items")?.valueChanges.subscribe(selectedValue => {
      this.calculate();
    }) 
  }

  get items() {
    return this.orderForm.get('items') as FormArray;
  }

  get f() { return this.orderForm.controls; }

  addItem() {
    this.items.push(this.fb.control(''));
  }
  removeItem(index: number) {
    this.items.removeAt(index);
  }

  calculate() {
    console.log(this.items as FormArray);
    
  }

  getApprovers() {
    return ['Dr. Ricks', 'Dr. Taylor', 'Dr. Sun', 'Dr. Lemmon', 'Dr. Gurbuz'];
  }

  approversList: string[] = this.getApprovers();

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.orderForm.invalid) {
        return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.orderForm.value, null, 4));
}
}
