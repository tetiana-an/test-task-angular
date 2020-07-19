import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/shared/services/orders.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})

export class BasketComponent implements OnInit {
  orders = JSON.parse(localStorage.getItem('products'));
  totalPrice: number;
  constructor(private orderService: OrdersService) { }

  ngOnInit(): void {
    this.total()
  }

  prodCount(product: any, status: boolean): void {
    if (status) {
      product.count++;
    } else {
      if (product.count > 1) {
        product.count--;
      }
    }
    this.total();
    this.updateLocalProducts();
    this.orderService.basket.next(this.orders);
  }

  private total(): void {
    this.totalPrice = this.orders.reduce((total, elem) => {
      return total + (elem.price * elem.count);
    }, 0);
  }

  private updateLocalProducts(): void {
    localStorage.setItem('products', JSON.stringify(this.orders));
  }

  deleteProd(product: any): void {
    const index = this.orders.findIndex(prod => prod.id === product.id);
    this.orders.splice(index, 1);
    this.total();
    this.updateLocalProducts();
    this.orderService.basket.next(this.orders);
  }

}
