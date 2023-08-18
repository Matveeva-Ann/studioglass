import { Component, Input, SimpleChanges } from '@angular/core';
import { IGoodsResponse } from 'src/app/shared/interface/goods-interface';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.scss']
})
export class GoodsComponent {
  public openForm = false;
  public editProduct?: IGoodsResponse; 

  toggleForm(){
    this.openForm = !this.openForm;
  }

  sendEditProduct(product: IGoodsResponse){
    this.editProduct = product;
    this.openForm = true;
  }
  productHasBeenEdited(){
    this.editProduct = undefined;
    this.openForm = false;
  }
}
