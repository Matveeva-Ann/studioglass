import { Component, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { IGoodsResponse } from 'src/app/shared/interface/goods-interface';
import { LocalStorageSubjectService } from 'src/app/shared/services/subjects/local-storage-subject/local-storage-subject.service';

@Component({
  selector: 'app-basket-dialog',
  templateUrl: './basket-dialog.component.html',
  styleUrls: ['./basket-dialog.component.scss'],
})
export class BasketDialogComponent {
  @Output() closeThisWindow = new EventEmitter<any>();

  public quantityGoods = 0;
  public goodsAmount = 0;

  constructor(
    private router:Router,
    private localStorageSubject: LocalStorageSubjectService,

  ){}

  ngOnInit(): void {
    this.countSum(); 
    this.localStorageSubject.localStorage$.subscribe(()=> {
      this.countSum(); 
      if (!JSON.parse(localStorage.getItem('basket') as string)){
        this.closeWindow();
        this.router.navigate(['/collection']);
      }
    })
  }

  countSum() {
    const productsInBasket: Array<IGoodsResponse> = JSON.parse(
      localStorage.getItem('basket') as string
    );
    if(productsInBasket){
      this.quantityGoods =  productsInBasket.reduce((total, elem) => total + elem.count, 0);
      this.goodsAmount = productsInBasket.reduce(
        (total, elem) => total + elem.price * elem.count,
        0
      );
    }
   
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
