import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/shared/services/categories/categories.service';
import { deleteObject, getDownloadURL, percentage, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent {
  public categoryForm!: FormGroup;
  public addedFile = false;
  public addedFileBanner = false;
  public uploadPercent = 0;
  public uploadPercentBanner = 0;
  public imgUrl = '';
  public bannerUrl = '';
  public editStatus = false;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoriesService,
    private storage: Storage,
  ){}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.categoryForm = this.fb.group({
      name: [null, Validators.required],
      path: [null, Validators.required],
      description: [null],
      img: [null],
      banner: [null],
    });
  }

  upload(event: any){
    console.log(event)
    const file = event.target.files[0];
    this.uploadFile('products', file.name ,file).then( data =>{
      this.categoryForm.value.img = data;
      this.imgUrl = data;
    })
    .catch(e =>{
      console.log(e);
    })
  }

  async uploadFile(folder:string, name:string, file: File | null){
    const random = Math.round(Math.random()*1000);
    const path = `${folder}/${random + name}`;
    let url = ''
    if(file){
      try{
        const storageRef = ref(this.storage, path);
        const task = uploadBytesResumable(storageRef, file);
        percentage(task).subscribe(data=>{
          this.uploadPercent = data.progress;
        })
       await task;
       url = await getDownloadURL(storageRef);
       this.addedFile = true;

      }catch(e:any){
        console.error(e)
      }
    }
    return Promise.resolve(url);
  }

  deleteImg(){
    const task = ref(this.storage, this.imgUrl);
    deleteObject(task).then(()=>{
      this.addedFile = false;
      this.uploadPercent = 0;
    })
  }

  uploadBanner(event: any){
    const file = event.target.files[0];

    this.uploadBannerFile('banner', file.name, file).then( data =>{
      this.categoryForm.value.banner = data;
      this.bannerUrl = data;
    })
    .catch(e =>{
      console.log(e);
    })
  }

  async uploadBannerFile(folder:string, name:string, file: File | null){
    const random = Math.round(Math.random()*1000);
    const path = `${folder}/${random + name}`;
    let url = ''
    if(file){
      try{
        const storageRef = ref(this.storage, path);
        const task = uploadBytesResumable(storageRef, file);
        percentage(task).subscribe(data=>{
          this.uploadPercentBanner = data.progress;
        })
       await task;
       url = await getDownloadURL(storageRef);
       this.addedFileBanner = true;
      }catch(e:any){
        console.error(e)
      }
    }
    return Promise.resolve(url);
  }

  deleteBanner(){
    const task = ref(this.storage, this.bannerUrl);
    deleteObject(task).then(()=>{
      this.addedFileBanner = false;
      this.uploadPercentBanner = 0;
      this.bannerUrl = '';
    })
  }


  addCategory(){
    this.categoryService.addCategory(this.categoryForm.value).then(()=>{})

    this.categoryForm.reset();
    this.addedFile= false;
    this.addedFileBanner = false;
    this.uploadPercent = 0;
    this.uploadPercentBanner = 0;
  }


}

