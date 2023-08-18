import { Component } from '@angular/core';
import { signInWithEmailAndPassword, Auth } from '@angular/fire/auth';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ROLE } from 'src/app/shared/constants/roles.constants';

@Component({
  selector: 'app-auth-admin',
  templateUrl: './auth-admin.component.html',
  styleUrls: ['./auth-admin.component.scss']
})
export class AuthAdminComponent {
  public adminLoginForm!: FormGroup;

  constructor(
    private router: Router,
    private auth: Auth,
    private fb: FormBuilder,
    private afs: Firestore,
  ){}

  ngOnInit(): void {
    this.initForm();    
  }

  closeWindow(){ 
    this.router.navigate(['/']);
  }
  stopPropagation(event: Event):void{
    event?.stopPropagation()
  }

  initForm(){
    this.adminLoginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })
  }

  loginAdmin(){
    const{ email, password} = this.adminLoginForm.value;
    this.login(email, password).then(()=>{
      console.log('login done')
    }).catch(e=>{
      console.log('error', e)
    })
  }

  async login( email:string, password: string): Promise<void>{
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    const authSub= docData(doc(this.afs, 'users', credential.user.uid)).subscribe(user => {
      const currentUser = { ...user, uid: credential.user.uid };
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      if(user['role'] === ROLE.ADMIN) {
        this.router.navigate(['/admin/goods'])
      } else {
        this.router.navigate(['/']);
      }
    }, (e) => {
      this.router.navigate(['/']);
      console.log('error', e);
    })
  }

  
}
