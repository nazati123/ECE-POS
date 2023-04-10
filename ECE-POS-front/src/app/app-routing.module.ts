import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApproveOrderComponent } from './approve-order/approve-order.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { OrdersDashboardComponent } from './orders-dashboard/orders-dashboard.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthGuard } from './auth.guard';
import { FacGuard } from './auth.facGuard';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'order-form', component: OrderFormComponent, canActivate: [AuthGuard] },
  { path: 'order-form/:id', component: OrderFormComponent},
  { path: 'dashboard', component: OrdersDashboardComponent },
  { path: 'approve-order/:id/:token', component: ApproveOrderComponent, canActivate: [FacGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }