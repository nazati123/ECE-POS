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
      date: ['', Validators.required, Validators.pattern(/^02\/(?:[01]\d|2\d)\/(?:19|20)(?:0[048]|[13579][26]|[2468][048])|(?:0[13578]|10|12)\/(?:[0-2]\d|3[01])\/(?:19|20)\d{2}|(?:0[469]|11)\/(?:[0-2]\d|30)\/(?:19|20)\d{2}|02\/(?:[0-1]\d|2[0-8])\/(?:19|20)\d{2}$/)],
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
      requesterPhone: ['', Validators.required],
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
