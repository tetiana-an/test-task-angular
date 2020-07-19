import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { Subscription } from 'rxjs/internal/Subscription';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  getOrders: Array<any> = [];
  totalPrice: number = 0;
  private subscription: Subscription;

  constructor(private orderService: OrdersService) { }

  ngOnInit(): void {
    this.ordersTotalPrice();
    this.getLocalStorage();
  }

  private ordersTotalPrice(): void {
    this.subscription = this.orderService.basket.subscribe(
      () => {
        this.getLocalStorage();
      }
    );
  }

  private getLocalStorage(): void {
    if (localStorage.length > 0 && localStorage.getItem('products')) {
      this.getOrders = JSON.parse(localStorage.getItem('products'));
      this.totalPrice = this.getOrders.reduce((total, elem) => {
        return total + (elem.price * elem.count)
      }, 0);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
