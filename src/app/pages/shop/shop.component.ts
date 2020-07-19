import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products = [
    { "id": 1, "name": "article 1", "label": "Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", "price": 25, "count": 1, "img": "../../../assets/images/prod1.jpg" },
    { "id": 2, "name": "article 2", "label": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", "price": 35, "count": 1, "img": "../../../assets/images/prod2.jpg" },
    { "id": 3, "name": "article 3", "label": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", "price": 45, "count": 1, "img": "../../../assets/images/prod3.jpg" }]

  constructor(private orderService: OrdersService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  showSuccess() {
    this.toastr.success('item added to cart');
  }

  addBasket(product): void {
    this.showSuccess();
    let localProducts: Array<any> = [];
    if (localStorage.length > 0 && localStorage.getItem('products')) {
      localProducts = JSON.parse(localStorage.getItem('products'));
      if (localProducts.some(prod => prod.id === product.id)) {
        const index = localProducts.findIndex(prod => prod.id === product.id);
        console.log(index);
        localProducts[index].count += product.count;
      } else {
        localProducts.push(product);
      }
      localStorage.setItem('products', JSON.stringify(localProducts));
    } else {
      localProducts.push(product);
      localStorage.setItem('products', JSON.stringify(localProducts));
    }
    this.orderService.basket.next(localProducts);
  }
}
