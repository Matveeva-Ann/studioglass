import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { IOrderResponse } from 'src/app/shared/interface/orders-interface';
import { OrderService } from 'src/app/shared/services/order/order.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('525ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class OrderComponent {
  public dataSource!: Array<IOrderResponse>
  public ordersArr!: Array<IOrderResponse>;

  columnsToDisplay = ['№', 'ПІБ замовника', 'Контакти', 'Спосіб оплати', 'Спосіб доставки', 'Адреса', 'Статус замовлення'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: IOrderResponse[] | null;
 
  constructor(
    private orderService: OrderService,
  ){ }

  ngOnInit(): void {
    this.getAllGoods();
  }

  getAllGoods() {
    this.orderService.getOrders().subscribe((data) => {
      this.ordersArr = data as IOrderResponse[];
      this.dataSource = data as IOrderResponse[];
    });
  }
  btnStatus(status: string, element:IOrderResponse, id:string){
    if(status !== 'Виконане'){
      element.orderStatus = status;
      this.orderService.editOrder(element, id).then();
    }else{
      this.orderService.deleteOrder(id).then();
    }

  }
}
