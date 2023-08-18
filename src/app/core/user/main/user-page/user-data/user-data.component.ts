import { Component, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDataService } from 'src/app/shared/services/user-data/user-data.service';
import { IUserDataRequest, IUserDataResponse } from '../../../../../shared/interface/user-data-interfase'; 

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent {
  public userDataForm!:FormGroup;
  public userAddressForm!: FormGroup;

  public address = false;
  public userAddress: Array<string> = [];

  constructor(
    private fb: FormBuilder,
    private userDataService: UserDataService,
  ){}

  ngOnInit(): void {
    this.initForm();
    this.initFormAddress();
  }

  addAddress(){
    this.address = !this.address;
  }
  initForm():void{
  
    this.userDataForm = this.fb.group({
      userName: [null, [Validators.required]],
      userSecondName: [null, Validators.required ],
      userPhone: [null, [Validators.required]],
      userEmail: [null, [Validators.required]],
    })
    const currentUser = JSON.parse( localStorage.getItem('currentUser') as string );
    this.userAddress = currentUser.address;

    if(currentUser !== null && currentUser.role === 'USER'){
      this.userDataForm.setValue({
      userName: currentUser.name,
      userSecondName: currentUser.secondName,
      userPhone: currentUser.phoneNumber,
      userEmail: currentUser.email,
      })
    }
  }

  initFormAddress():void{
    this.userAddressForm = this.fb.group({
      city: [null, [Validators.required]],
      regional: [null, [Validators.required]],
      street: [null, [Validators.required]],
      houseNumber: [null, [Validators.required]],
      apartmentNumber: [null],
    })
  }

  addNewAddress(){
    const currentUser = JSON.parse( localStorage.getItem('currentUser') as string );
    const userId = currentUser.uid;
    const newAddress = `місто:${this.userAddressForm.value.city}, ${this.userAddressForm.value.regional} область, вул. ${this.userAddressForm.value.street}, ${this.userAddressForm.value.houseNumber}, кв.${this.userAddressForm.value.apartmentNumber}`
    this.address = false;
    const userData = {
      email: currentUser.email,
      name: currentUser.name,
      secondName: currentUser.secondName,
      phoneNumber: currentUser.phoneNumber,
      orders: [],
      role: "USER",
      address: currentUser.address,
      uid: userId,
    }
    userData.address.push(newAddress);

    localStorage.setItem('currentUser', JSON.stringify(userData));
    this.initForm();
    this.userAddressForm.reset();
    this.userDataService.updateUserData(userData, userId).then();
  }


}
