import { Component } from '@angular/core';
import { signInWithEmailAndPassword, Auth } from '@angular/fire/auth';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public userLoginForm!: FormGroup;

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
    this.userLoginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })
  }

  loginUser(){
    const{ email, password} = this.userLoginForm.value;
    this.login(email, password).then(()=>{
      console.log('login done')
    }).catch(e=>{
      console.log('error', e)
      // this.toastr.error('Перевірте правильність заповнення полів');
    })
  }

  async login( email:string, password: string): Promise<void>{
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    console.log(credential)
    const authSub= docData(doc(this.afs, 'users', credential.user.uid)).subscribe(user => {
      const currentUser = { ...user, uid: credential.user.uid };
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      console.log(currentUser)
      // if(user['role'] === 'USER') {
        this.router.navigate(['/userPage/userData'])
      // } else {
        // this.router.navigate(['/']);
      // }
    }, (e) => {
      this.router.navigate(['/']);
      console.log('error', e);
    })
  }

}
