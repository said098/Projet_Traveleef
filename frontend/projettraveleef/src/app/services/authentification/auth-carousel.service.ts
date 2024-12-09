import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthCarouselService {
  private current_index: number = 1;
  //private current_index = new BehaviorSubject<number>(1);
  //current_index$!: Observable<number>;

  private total_items: number = 3;
  private transform_style = new BehaviorSubject<string>('translateX(-33.3333%)');
  transform_style$!: Observable<string>;

  constructor() { 
    this.transform_style$ = this.transform_style.asObservable();
  }

  prev() {
    console.log("prev");
    this.current_index = (this.current_index - 1 + this.total_items) % this.total_items;
    this.transform_style.next(`translateX(-${this.current_index * 100 / this.total_items}%)`);
  }

  next() {
    console.log("next");
    this.current_index = (this.current_index + 1) % this.total_items;
    this.transform_style.next(`translateX(-${this.current_index * 100 / this.total_items}%)`);
  }
}
