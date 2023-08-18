import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IGoodsResponse } from 'src/app/shared/interface/goods-interface';
import { GoodsService } from 'src/app/shared/services/goods/goods.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  public goodsArr: IGoodsResponse[] = [];
  public categoryTitle = '';

  constructor(
    public goodsService:GoodsService,
    private activatedRoute: ActivatedRoute,

  ){}

  ngOnInit(): void {
    this.getGoodsByCategory();
    this.activatedRoute.paramMap.subscribe(() => {
      this.getGoodsByCategory();
    });
  }

  getGoodsByCategory():void{
    const categoryNamePath = this.activatedRoute.snapshot.paramMap.get('category') as string;
    this.goodsService.getGoodsByCategory(categoryNamePath).subscribe((data)=>{
      this.goodsArr = data as IGoodsResponse[];
      this.categoryTitle = data[0]['category'];
    })
  }


}
