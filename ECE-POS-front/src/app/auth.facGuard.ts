import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { OrdersService } from './orders.service';
import { Order } from './order';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FacGuard implements CanActivate {

  constructor(private ordersService: OrdersService, private router: Router) {   }

  hash(num1: number, num2: number, num3: number, num4: number): string {
    const m = 0x5bd1e995;
    const r = 24;
    let h1 = 0x8a2ae2ba ^ num1;
    let h2 = 0x8b3c113c ^ num2;
    let h3 = 0x2a17eb2c ^ num3;
    let h4 = 0x08c9d639 ^ num4;
  
    h1 = (h1 * m) >>> 0;
    h1 = (h1 ^ (h1 >>> 16)) >>> 0;
    h2 = (h2 * m) >>> 0;
    h2 = (h2 ^ (h2 >>> 16)) >>> 0;
    h3 = (h3 * m) >>> 0;
    h3 = (h3 ^ (h3 >>> 16)) >>> 0;
    h4 = (h4 * m) >>> 0;
    h4 = (h4 ^ (h4 >>> 16)) >>> 0;
  
    h1 = ((h1 * m) ^ h2) >>> 0;
    h2 = ((h2 * m) ^ h3) >>> 0;
    h3 = ((h3 * m) ^ h4) >>> 0;
    h4 = ((h4 * m) ^ h1) >>> 0;
  
    h1 = (h1 * m) >>> 0;
    h1 = (h1 ^ (h1 >>> r)) >>> 0;
    h2 = (h2 * m) >>> 0;
    h2 = (h2 ^ (h2 >>> r)) >>> 0;
    h3 = (h3 * m) >>> 0;
    h3 = (h3 ^ (h3 >>> r)) >>> 0;
    h4 = (h4 * m) >>> 0;
    h4 = (h4 ^ (h4 >>> r)) >>> 0;
  
    const hashHex = (h1 ^ h2 ^ h3 ^ h4).toString(16).padStart(32, '0');
    return hashHex.substring(24, 32);
  }
  

  canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const id = route.paramMap.get('id')!
    const token = route.paramMap.get('token')!

    let canActivate = false;
    const objectSubject = new Subject<Order>();

    this.ordersService.getOrder(+id).subscribe(order => {
      console.log(order);
      objectSubject.next(order);
      objectSubject.complete();
    }, error => {
      console.log('could not fetch order.');
      this.router.navigate(['/']);
    });
    return new Promise((resolve, reject) => {
      objectSubject.pipe(take(1)).subscribe(order => {
        // could calculate based off order parameters
        const timestamp = order.dateCreated?.split('-')!
        const year = parseInt(timestamp[0])
        const month = parseInt(timestamp[1])
        const day = parseInt(timestamp[2])

        const secretToken = this.hash(year, month, day, parseInt(id));

        console.log(secretToken)
        canActivate = token === secretToken
        if (!canActivate) {
          console.log('nope');
          this.router.navigate(['/']);
        }
        resolve(canActivate);
      }, error => {
        console.log('error in Promise');
        this.router.navigate(['/']);
        reject(error);
      });
    });
  }
}