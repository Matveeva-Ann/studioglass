import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CallBackService } from 'src/app/shared/services/call-back/call-back.service';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.scss']
})
export class AdminNavComponent {
  public activeTab = '';
  public callsUnit = 0;

  constructor(
    public router: Router,
    private callBackService: CallBackService,
  ){}

  ngOnInit(): void {
    this.callBackService.getPhoneData().subscribe((data) => {
      this.callsUnit = data.length;
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
