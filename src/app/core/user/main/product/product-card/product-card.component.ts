import { Component, Input, SimpleChanges } from '@angular/core';
import { IGoodsResponse } from 'src/app/shared/interface/goods-interface';
import { GoodsService } from 'src/app/shared/services/goods/goods.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() goodsArr: IGoodsResponse[] = [];
  public allGoodsByCategory: IGoodsResponse[] = [];


  ngOnChanges(changes: SimpleChanges): void {
    if(changes['goodsArr']){
      this.allGoodsByCategory = this.goodsArr;
     console.log(this.allGoodsByCategory)
    }
    
  }
  
}
