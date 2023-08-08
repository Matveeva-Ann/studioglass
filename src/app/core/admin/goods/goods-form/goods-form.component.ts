import { Component } from '@angular/core';
import { deleteObject, getDownloadURL, percentage, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { GoodsService } from 'src/app/shared/services/goods/goods.service';


@Component({
  selector: 'app-goods-form',
  templateUrl: './goods-form.component.html',
  styleUrls: ['./goods-form.component.scss'],
})
export class GoodsFormComponent {

  public goodsForm!: FormGroup;
  public editStatus = false;
  public addedFile = false;
  public uploadPercent = 0;
  public ingUrl = '';
  private pathCategory!: any;

  public allCategories = [
    {
      category: 'Shower Boxes',
      path: 'dushovi-kabini'
    },
    {
      category: 'Led Mirrors',
      path: 'led-mirror'
    },
    {
      category: 'Iron Mirrors',
      path: 'iron-mirror'
    },
    {
      category: 'Design Series',
      path: 'design-series'
    },
    {
      category:  'Mega Mirrors',
      path: 'mega-mirrors'
    },
    {
      category:  'Mirrors',
      path: 'mirrors'
    },
  ]

  constructor(
    private fb: FormBuilder,
    private goodsService: GoodsService,
    private storage: Storage,
  ){}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.goodsForm = this.fb.group({
      category: ["*Виберіть категорію", Validators.required],
      name: [null, Validators.required],
      description: [null, Validators.required],
      size: [null],
      code: [null, Validators.required],
      price: [null, Validators.required],
      img: [null],
    });
  }

  onCategoryChange(event: any){
    const allCategoriesArrItem = this.allCategories.find(item => item.category === event.target.value);
     this.pathCategory = allCategoriesArrItem?.path;
  }
  addGoods(){
    this.goodsForm.value.path = this.pathCategory;
    this.goodsService.addGoods(this.goodsForm.value).then(()=>{});

    this.goodsForm.reset();
    this.goodsForm.patchValue({
      category: "*Виберіть категорію",
    });
    this.addedFile = false;
    this.uploadPercent = 0;
  }

  upload(event: any){
    console.log(event)
    const file = event.target.files[0];
    this.uploadFile('products', file.name ,file).then( data =>{
      this.goodsForm.value.img = data;
      this.ingUrl = data;
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
    const task = ref(this.storage, this.ingUrl);
    deleteObject(task).then(()=>{
      this.addedFile = false;
      this.uploadPercent = 0;
    })
  }


}
