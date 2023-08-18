import { Component } from '@angular/core';;
import { signInWithEmailAndPassword, Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public userRegisterForm!: FormGroup;
  public wrongPassword = false;
  constructor(
    private router: Router,
    private auth: Auth,
    private fb: FormBuilder,
    private afs: Firestore,

  ){}

  ngOnInit(): void {
    this.initForm();    
  }

  initForm(){

    this.userRegisterForm = this.fb.group({
      name: [null, [Validators.required]],
      secondName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phoneNumber: [null, [Validators.required]],
      password: [null, [Validators.required]],
      repeatPassword: [null, [Validators.required]],
    })
  }
  register():void {
    if (this.userRegisterForm.value.password !== this.userRegisterForm.value.repeatPassword){
      return;
    }
    const {email, password} = this.userRegisterForm.value;
    this.userRegister(email, password).then(()=>{
        console.log('login done')
      }).catch(e=>{
        console.log('error', e)
        this.wrongPassword = true;
      });
    this.wrongPassword = false;
  }

  async userRegister(email:string, password:string): Promise<void>{
    const credential = await createUserWithEmailAndPassword( this.auth, email, password);
    const newUser = {
      email: credential.user.email,
      name: this.userRegisterForm.value.name,
      secondName: this.userRegisterForm.value.secondName,
      phoneNumber: this.userRegisterForm.value.phoneNumber,
      uid: credential.user.uid,
      orders: [],
      address: [],
      role: 'USER',
    }
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    await setDoc(doc(this.afs, 'Users', credential.user.uid), newUser);
    await this.router.navigate([`/userPage/userData`]);
  }

}
