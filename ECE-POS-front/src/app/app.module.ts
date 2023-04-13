import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import { OrdersDashboardComponent } from './orders-dashboard/orders-dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ApproveOrderComponent } from './approve-order/approve-order.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { PaLoginPageComponent } from './pa-login-page/pa-login-page.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderFormComponent,
    OrdersDashboardComponent,
    ApproveOrderComponent,
    LoginPageComponent,
    PaLoginPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatSelectModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
