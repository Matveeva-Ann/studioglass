import { Component } from '@angular/core';
import { CallBackService } from 'src/app/shared/services/call-back/call-back.service';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.scss']
})
export class CallComponent {
  public dataArr = [
    {
    name: '',
    phoneNumber: '',
    }
   ];

  constructor(private callBackService: CallBackService) {  }

  ngOnInit(): void {
   this.loadPhoneData();
  }

  async loadPhoneData() {
    this.callBackService.getPhoneData().subscribe((data) => {
      this.dataArr = data as any;
    });
  }
  
  delete(userData: any) {
    this.callBackService.deletePhoneData(userData.id).then(()=>{
      this.loadPhoneData();
    })
  }
}
