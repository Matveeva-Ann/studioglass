import { Component, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.scss']
})
export class GoodsComponent {
  public openForm = false;

  toggleForm(){
    this.openForm = !this.openForm;
    console.log( this.openForm)
  }
}
