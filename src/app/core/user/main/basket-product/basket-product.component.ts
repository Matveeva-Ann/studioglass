import { Component, EventEmitter, Output } from '@angular/core';
import { IGoodsResponse } from 'src/app/shared/interface/goods-interface';
import { LocalStorageSubjectService } from 'src/app/shared/services/subjects/local-storage-subject/local-storage-subject.service';

@Component({
  selector: 'app-basket-product',
  templateUrl: './basket-product.component.html',
  styleUrls: ['./basket-product.component.scss'],
})
export class BasketProductComponent {
  public productsInBasket: Array<IGoodsResponse> = [];

  @Output() amountProducts = new EventEmitter<number>();
  @Output() totalPrice = new EventEmitter<number>();

  constructor(
    private localStorageSubjectService: LocalStorageSubjectService,
  ){}

  ngOnInit(): void {
   this.updateBasket();
  }

  updateBasket(){
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

  removeUnit(product: any){
    let productsInLS: Array<IGoodsResponse> = JSON.parse(localStorage.getItem('basket') as string);
    productsInLS = productsInLS.filter(item => item.id !== product.id);
    localStorage.setItem('basket', JSON.stringify(productsInLS));
    this.updateBasket();
    this.localStorageSubjectService.localStorage$.next();
  }

}
