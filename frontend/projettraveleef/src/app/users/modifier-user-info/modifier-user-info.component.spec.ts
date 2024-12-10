import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierUserInfoComponent } from './modifier-user-info.component';

describe('ModifierUserInfoComponent', () => {
  let component: ModifierUserInfoComponent;
  let fixture: ComponentFixture<ModifierUserInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierUserInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
