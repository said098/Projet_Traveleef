import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageProppsComponent } from './page-propps.component';

describe('PageProppsComponent', () => {
  let component: PageProppsComponent;
  let fixture: ComponentFixture<PageProppsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageProppsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageProppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
