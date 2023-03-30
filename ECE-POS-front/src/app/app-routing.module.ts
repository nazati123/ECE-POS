import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApproveOrderComponent } from './approve-order/approve-order.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { OrdersDashboardComponent } from './orders-dashboard/orders-dashboard.component';

const routes: Routes = [
  { path: 'order-form', component: OrderFormComponent},
  { path: 'order-form/:id', component: OrderFormComponent},
  { path: 'dashboard', component: OrdersDashboardComponent },
  { path: 'approve-order/:id', component: ApproveOrderComponent },
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }