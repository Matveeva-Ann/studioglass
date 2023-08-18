import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { deleteObject, getDownloadURL, percentage, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CategoriesService } from 'src/app/shared/services/categories/categories.service';
import { GoodsService } from 'src/app/shared/services/goods/goods.service';
import { ICategoryResponse } from 'src/app/shared/interface/category-interface';
import { IGoodsResponse } from 'src/app/shared/interface/goods-interface';


@Component({
  selector: 'app-goods-form',
  templateUrl: './goods-form.component.html',
  styleUrls: ['./goods-form.component.scss'],
})
export class GoodsFormComponent {
  @Input() editProduct?: IGoodsResponse;
  @Output() productHasBeenEdited = new EventEmitter<void>();

  public goodsForm!: FormGroup;
  public editStatus = false;
  public addedFile = false;
  public uploadPercent = 0;
  public imgUrl = '';
  private pathCategory!: any;
  public idGood = '0';

  public allCategories: Array<ICategoryResponse> = [ ];

  constructor(
    private fb: FormBuilder,
    private goodsService: GoodsService,
    private categoriesService: CategoriesService,
    private storage: Storage,
  ){}

  ngOnInit(): void {
    this.initForm();
    this.categoriesService.getCategory().subscribe((data)=>{
      console.log(data)
      this.allCategories = data as Array<ICategoryResponse>;
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editProduct']){
      this.initForm();
    }
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
    if(this.editProduct){
      this.addedFile = true;
      this.imgUrl = this.editProduct.img;
      this.idGood = this.editProduct.id;
      this.goodsForm.patchValue({
      category: this.editProduct.category,
      name: this.editProduct.name,
      description: this.editProduct.description,
      size: this.editProduct.size,
      code: this.editProduct.code,
      price: this.editProduct.price,
      img: this.editProduct.img,
      path: this.editProduct.path,
      });
    }
  }

  onCategoryChange(event: any){
    const allCategoriesArrItem = this.allCategories.find(item => item.name === event.target.value);
     this.pathCategory = allCategoriesArrItem?.path;
  }
  addGoods(){
    if(!this.editProduct){
      this.goodsForm.value.path = this.pathCategory;
      this.goodsService.addGoods(this.goodsForm.value).then(()=>{});
    } else{
      this.goodsForm.value.path = this.editProduct.path;
      this.goodsService.updateGoods(this.goodsForm.value, this.idGood).then(()=>{});
      this.productHasBeenEdited.emit();
    }
    

    this.goodsForm.reset();
    this.goodsForm.patchValue({
      category: "*Виберіть категорію",
    });
    this.addedFile = false;
    this.editProduct = undefined;
    this.uploadPercent = 0;
  }

  upload(event: any){
    const file = event.target.files[0];
    this.uploadFile('products', file.name ,file).then( data =>{
      this.goodsForm.value.img = data;
      this.imgUrl = data;
      this.addedFile = true;
    }).catch(e =>{
      console.log(e);
    })

  }

  async uploadFile(folder:string, name:string, file: File | null){
    const random = Math.round(Math.random()*1000);
    const path = `${folder}/${random + name}`;

    if(file){
      try{
        const storageRef = ref(this.storage, path);
        const task = uploadBytesResumable(storageRef, file);
        percentage(task).subscribe(data=>{
          this.uploadPercent = data.progress;
        })
       await task;
       this.imgUrl = await getDownloadURL(storageRef);
       this.addedFile = true;

      }catch(e:any){
        console.error(e)
      }
      if (this.editProduct) {
        this.editProduct.img = this.imgUrl;
      }
    }
    return Promise.resolve(this.imgUrl);
  }

  deleteImg(){
    const task = ref(this.storage, this.imgUrl);
    deleteObject(task).then(()=>{
      this.addedFile = false;
      this.uploadPercent = 0;
    })
  }


}
