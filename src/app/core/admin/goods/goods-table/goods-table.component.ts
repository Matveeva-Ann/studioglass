import { Component, EventEmitter, Output } from '@angular/core';
import { IGoodsResponse } from 'src/app/shared/interface/goods-interface';
import { GoodsService } from 'src/app/shared/services/goods/goods.service';;

@Component({
  selector: 'app-goods-table',
  templateUrl: './goods-table.component.html',
  styleUrls: ['./goods-table.component.scss']
})
export class GoodsTableComponent {
  public goodsArr:IGoodsResponse[] = [];
  @Output() sendEditProduct = new EventEmitter<IGoodsResponse>();

  constructor(
    private goodsService: GoodsService,
  ){}

  ngOnInit(): void {
    this.getAllGoods();
  }

  getAllGoods() {
    this.goodsService.getGoods().subscribe((data) => {
      this.goodsArr = data as IGoodsResponse[];
    });
  }

  edit(product:IGoodsResponse){
    this.sendEditProduct.emit(product);
  }

  delete(product: IGoodsResponse){
    this.goodsService.deleteGoods(product.id).then(() => {
      this.getAllGoods();
    });
  }

}
