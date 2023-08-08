import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-article-aboutus',
  templateUrl: './article-aboutus.component.html',
  styleUrls: ['./article-aboutus.component.scss'],
})
export class ArticleAboutusComponent {
  private initialMarginTop = 100;
  private reductionFactor = 0.2;

  marginTopValue = this.initialMarginTop;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY;
    this.marginTopValue =
      this.initialMarginTop - (scrollPosition * this.reductionFactor - 160);
  }
}
