import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApproveOrderComponent } from './approve-order/approve-order.component';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { OrdersDashboardComponent } from './orders-dashboard/orders-dashboard.component';
import { GroupDashboardComponent } from './group-dashboard/group-dashboard.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { PaLoginPageComponent } from './pa-login-page/pa-login-page.component'
import { AuthGuard } from './auth.guard';
import { FacGuard } from './auth.facGuard';
import { SuperAuthGuard } from './superauth.guard';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'pa-login', component: PaLoginPageComponent },
  { path: 'order-form', component: OrderFormComponent, canActivate: [AuthGuard] },
  { path: 'group-dashboard', component: GroupDashboardComponent},
  { path: 'order-form/:id', component: OrderFormComponent},
  { path: 'dashboard', component: OrdersDashboardComponent, canActivate: [SuperAuthGuard] },
  { path: 'admin-panel', component: AdminPanelComponent, canActivate: [SuperAuthGuard] },
  { path: 'approve-order/:id/:token/:approver', component: ApproveOrderComponent, canActivate: [FacGuard] },
  { path: 'edit-order/:id', component: EditOrderComponent, canActivate: [SuperAuthGuard]},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }