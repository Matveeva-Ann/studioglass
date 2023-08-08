import { Component, EventEmitter, Output } from '@angular/core';
import { IGoodsResponse } from 'src/app/shared/interface/goods-interface';

@Component({
  selector: 'app-basket-product',
  templateUrl: './basket-product.component.html',
  styleUrls: ['./basket-product.component.scss'],
})
export class BasketProductComponent {
  public productsInBasket: Array<IGoodsResponse> = [];

  @Output() amountProducts = new EventEmitter<number>();
  @Output() totalPrice = new EventEmitter<number>();

  public amount = 1;

  ngOnInit(): void {
    this.productsInBasket = JSON.parse(
      localStorage.getItem('basket') as string
    );
  }

  reduce(product: any) {
    if (product.count > 1) {
      product.count--;
      this.changeLocal();
    }
  }

  increase(product: any) {
    product.count++;
    this.changeLocal();
  }

  changeLocal() {
    localStorage.setItem('basket', JSON.stringify(this.productsInBasket));
    const price = this.productsInBasket.reduce((total, elem) => total + elem.price * elem.count, 0);
    const amount = this.productsInBasket.reduce((total, elem) => total + elem.count, 0);
    this.totalPrice.emit(price);
    this.amountProducts.emit(amount);
  }


}
