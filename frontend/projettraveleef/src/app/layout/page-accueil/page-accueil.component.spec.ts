import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAccueilComponent } from './page-accueil.component';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('PageAccueilComponent', () => {
  let component: PageAccueilComponent;
  let fixture: ComponentFixture<PageAccueilComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageAccueilComponent, HttpClientTestingModule, FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageAccueilComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should perform search and return flights', () => {
    const mockFlights = [
      {
        origin: 'Paris',
        destination: 'Milan',
        operatingCarrierCode: 'AF',
        flightNumber: 'AF123',
        departureDate: '2024-12-10'
      }
    ];

    component.search.origin = 'Paris';
    component.search.destination = 'Milan';
    component.search.outboundDate = '2024-12-10';
    component.search.returnDate = '2024-12-20';
    component.search.numPassengers = 1;

    component.onSearch();

    const req = httpMock.expectOne('/user/search_trips');
    expect(req.request.method).toBe('POST');
    req.flush({ flights: mockFlights });

    expect(component.flights).toEqual(mockFlights);
    expect(component.loading).toBeFalse();
    expect(component.error).toBe('');
  });

  it('should handle error on search', () => {
    component.onSearch();

    const req = httpMock.expectOne('/user/search_trips');
    expect(req.request.method).toBe('POST');
    req.flush({ error: 'Erreur serveur' }, { status: 500, statusText: 'Server Error' });

    expect(component.flights).toEqual([]);
    expect(component.loading).toBeFalse();
    expect(component.error).toBe('Erreur serveur');
  });
});
