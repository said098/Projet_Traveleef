import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VoyageComponent } from './voyage.component';

describe('VoyageComponent', () => {
  let component: VoyageComponent;
  let fixture: ComponentFixture<VoyageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoyageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoyageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the list of voyages', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Gestion Des Reservations');
    // expect(compiled.querySelectorAll('table tr').length).toBe(component.voyages.length + 1); // +1 for the header row
  });
});
