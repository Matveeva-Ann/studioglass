import { Component, Input, SimpleChanges } from '@angular/core';
import { IGoodsResponse } from 'src/app/shared/interface/goods-interface';
import { GoodsService } from 'src/app/shared/services/goods/goods.service';

@Component({
  selector: 'app-all-category-product',
  templateUrl: './all-category-product.component.html',
  styleUrls: ['./all-category-product.component.scss']
})
export class AllCategoryProductComponent {
  @Input() goodsArr: IGoodsResponse[] = []
  public quantityGoods = 0;
 
  selected = 'За замовчуванням';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['goodsArr'] && changes['goodsArr'].currentValue) {
      this.quantityGoods = changes['goodsArr'].currentValue.length;
    }
  }

 

}
