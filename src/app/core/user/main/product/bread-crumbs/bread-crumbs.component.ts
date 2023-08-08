import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bread-crumbs',
  templateUrl: './bread-crumbs.component.html',
  styleUrls: ['./bread-crumbs.component.scss'],
})
export class BreadCrumbsComponent {
  @Input() categoryTitle!: string;
  @Input() productTitle!: string;

  public categoryLink = '';

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.getCategoryLink();
  }
  
  getCategoryLink() {
    this.categoryLink = this.activatedRoute.snapshot.paramMap.get('category') as string;
  }
}
