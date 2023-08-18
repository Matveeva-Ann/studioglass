import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/shared/services/categories/categories.service';
import {
  deleteObject,
  getDownloadURL,
  percentage,
  ref,
  Storage,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { ICategoryResponse } from 'src/app/shared/interface/category-interface';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent {
  @Input() editCategory!: ICategoryResponse | undefined;
  @Output() categoryHasBeenEdited = new EventEmitter<void>();

  public categoryForm!: FormGroup;
  public addedFile = false;
  public addedFileBanner = false;
  public uploadPercent = 0;
  public uploadPercentBanner = 0;
  public imgUrl = '';
  public bannerUrl = '';
  public editStatus = false;
  public categoryId = '0';

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoriesService,
    private storage: Storage
  ) {}

  ngOnInit(): void {
    this.initForm();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editCategory']){
      this.initForm();
    }
  }

  initForm() {
    this.categoryForm = this.fb.group({
      name: [null, Validators.required],
      nameBth: [null],
      path: [null, Validators.required],
      description: [null],
      img: [null],
      banner: [null],
    });
    if (this.editCategory) {
      this.categoryId = this.editCategory.id;
      this.addedFile = true;
      this.addedFileBanner = true;
      this.categoryForm.patchValue({
        name: this.editCategory.name,
        nameBth: this.editCategory.nameBth,
        path: this.editCategory.path,
        description: this.editCategory.description,
        img: this.editCategory.img,
        banner: this.editCategory.banner,
      });
      this.bannerUrl = this.editCategory.banner;
      this.imgUrl = this.editCategory.img;
      if (!this.editCategory.banner) {
        this.addedFileBanner = false;
      }
    }
  }

  upload(event: any) {
    const file = event.target.files[0];
    this.uploadFile('products', file.name, file)
      .then((data) => {
        this.imgUrl = data;
        this.categoryForm.patchValue({
          img: data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async uploadFile(folder: string, name: string, file: File | null) {
    const random = Math.round(Math.random() * 1000);
    const path = `${folder}/${random + name}`;
    let url = '';
    if (file) {
      try {
        const storageRef = ref(this.storage, path);
        const task = uploadBytesResumable(storageRef, file);
        percentage(task).subscribe((data) => {
          this.uploadPercent = data.progress;
        });
        await task;
        url = await getDownloadURL(storageRef);
        this.addedFile = true;
      } catch (e: any) {
        console.error(e);
      }
      if (this.editCategory) {
        this.editCategory.img = this.imgUrl;
      }
    }
    return Promise.resolve(url);
  }

  deleteImg() {
    const task = ref(this.storage, this.imgUrl);
    deleteObject(task).then(() => {
      this.addedFile = false;
      this.uploadPercent = 0;
      this.categoryForm.patchValue({
        img: null,
      });
    });
    this.imgUrl = '';
  }

  uploadBanner(event: any): void {
    const file = event.target.files[0];

    this.uploadBannerFile('banner', file.name, file)
      .then((data) => {
        this.categoryForm.patchValue({
          banner: data,
        });
        this.bannerUrl = data;
        this.addedFileBanner = true;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async uploadBannerFile(folder: string, name: string, file: File | null) {
    const random = Math.round(Math.random() * 1000);
    const path = `${folder}/${random + name}`;

    if (file) {
      try {
        const storageRef = ref(this.storage, path);
        const task = uploadBytesResumable(storageRef, file);
        percentage(task).subscribe((data) => {
          this.uploadPercentBanner = data.progress;
        });
        await task;
        this.bannerUrl = await getDownloadURL(storageRef);
        this.addedFileBanner = true;
      } catch (e: any) {
        console.error(e);
      }
      if (this.editCategory) {
        this.editCategory.banner = this.bannerUrl;
      }
    }
    return Promise.resolve(this.bannerUrl);
  }

  deleteBanner() {
    const task = ref(this.storage, this.bannerUrl);
    deleteObject(task).then(() => {
      this.addedFileBanner = false;
      this.uploadPercentBanner = 0;
      this.categoryForm.patchValue({
        banner: null,
      });
    });
  }

  addCategory() {
    if (!this.editCategory) {
      this.categoryService.addCategory(this.categoryForm.value).then(() => {});
    } else {
      this.categoryService
        .updateCategory(this.categoryForm.value, this.categoryId)
        .then(() => {});
      this.categoryHasBeenEdited.emit();
    }

    this.editCategory = undefined;
    this.categoryForm.reset();
    this.addedFile = false;
    this.addedFileBanner = false;
    this.uploadPercent = 0;
    this.uploadPercentBanner = 0;
  }
}
