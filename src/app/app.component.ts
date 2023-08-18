import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'studioglass';
  public productPage!: boolean;
  public adminPage!: boolean;

  constructor(private router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateProductPageFlag();
        this.adminPageFlag();
      }
    });
  }

  ngOnInit(): void {
    this.updateProductPageFlag();
    this.adminPageFlag();
  }

  private updateProductPageFlag(): void {
    this.productPage = this.router.url.includes('/product');
  }
  private adminPageFlag(): void {
    this.adminPage = this.router.url.includes('/admin');
  }
}
