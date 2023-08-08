import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleAboutusComponent } from './article-aboutus.component';

describe('ArticleAboutusComponent', () => {
  let component: ArticleAboutusComponent;
  let fixture: ComponentFixture<ArticleAboutusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleAboutusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleAboutusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
