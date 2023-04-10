import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { OrdersService } from './orders.service';

@Injectable({
  providedIn: 'root'
})
export class FacGuard implements CanActivate {

  secretToken : string;

  constructor(private ordersService: OrdersService) {  this.secretToken = 'wait' }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    console.log('facGuard')
    const id = route.paramMap.get('id')!
    const token = route.paramMap.get('token')!
    this.ordersService.getOrder(+id).subscribe(order => {
        this.secretToken = '25';
    });
    // while ( this.secretToken === 'wait' ) {   }
    if (token != this.secretToken) {
      return false;
    }
    return true;
  }
}