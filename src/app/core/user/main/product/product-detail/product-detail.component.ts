import { Component, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IGoodsResponse } from 'src/app/shared/interface/goods-interface';
import { GoodsService } from 'src/app/shared/services/goods/goods.service';
import { AddProductService } from 'src/app/shared/services/subjects/add-product/add-product.service';
import { LocalStorageSubjectService } from 'src/app/shared/services/subjects/local-storage-subject/local-storage-subject.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  public productById!: IGoodsResponse | undefined;
  public categoryTitle = '';
  public productTitle = '';
  public count = 1;
  public size = '';

  constructor(
    private goodsService: GoodsService,
    private activatedRoute: ActivatedRoute,
    private localStorageSubject: LocalStorageSubjectService
  ){}

  ngOnInit(): void {
    this.getGoodById();
  
  }
  reduce() {
    if(this.count > 1){
      this.count--;
    }
  }
  
  increase() {
    this.count++;
  }

 getGoodById():void{
    const goodId = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.goodsService.getOneGood(goodId).subscribe((data)=>{
      this.productById = data as IGoodsResponse;
      this.categoryTitle = data['category'];
      this.productTitle = data['name'];
    })
  }
  newSize(event: any){
    this.size += event + ' * ';
  }

  addProduct(){
    const addedProduct = Object.assign({}, this.productById)
    addedProduct.count = this.count;
    addedProduct.size = this.size;

    let basket: Array<IGoodsResponse> = [];
    if(localStorage.getItem('basket')){
          basket = JSON.parse(localStorage.getItem('basket') as string);
          if (basket.some((item) => item.id ===  addedProduct.id)){
            const index = basket.findIndex((elem) => elem.id === addedProduct.id);
            basket[index].count = (basket[index].count || 0) + this.count;
          }else{
            basket.push(addedProduct);
          }
        }else{
          basket.push(addedProduct);
        }
      localStorage.setItem('basket', JSON.stringify(basket));
      this.localStorageSubject.localStorage$.next();
     this.count = 1;
  }




}
