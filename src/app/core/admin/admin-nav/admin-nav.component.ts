import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CallBackService } from 'src/app/shared/services/call-back/call-back.service';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.scss']
})
export class AdminNavComponent {
  public activeTab = '';
  public callsUnit = 0;
  public orders = 0;

  constructor(
    public router: Router,
    private callBackService: CallBackService,
    private orderService: OrderService,

  ){}

  ngOnInit(): void {
    this.countCallBacks();
    this.countOrders();
  }

  countCallBacks(){
    this.callBackService.getPhoneData().subscribe((data) => {
      this.callsUnit = data.length;
    });
  }
  countOrders(){
    this.orderService.getOrders().subscribe((data) => {
      this.orders = data.length;   
    });
  }

  click(clickElem:string):void{
    this.activeTab=clickElem;
  }

  logout(): void{
    this.router.navigate(['/']);
    localStorage.removeItem('currentUser');
  }


}
