import { Component, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { IGoodsResponse } from 'src/app/shared/interface/goods-interface';

@Component({
  selector: 'app-basket-dialog',
  templateUrl: './basket-dialog.component.html',
  styleUrls: ['./basket-dialog.component.scss'],
})
export class BasketDialogComponent {
  @Output() closeThisWindow = new EventEmitter<any>();

  public quantityGoods = 0;
  public goodsAmount = 0;

  ngOnInit(): void {
    this.countSum();
    
  }

  countSum() {
    const productsInBasket: Array<IGoodsResponse> = JSON.parse(
      localStorage.getItem('basket') as string
    );
    this.quantityGoods =  productsInBasket.reduce((total, elem) => total + elem.count, 0);
    this.goodsAmount = productsInBasket.reduce(
      (total, elem) => total + elem.price * elem.count,
      0
    );
  }

  totalPrice(event: number){
    this.goodsAmount = event;
  }
  amountProducts(event: number){
    this.quantityGoods= event;
  }

  closeWindow() {
    this.closeThisWindow.emit();
  }
}
