import { Component, Input, Output, EventEmitter } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

@Component({
  selector: 'app-flight-details-modal',
  templateUrl: './flight-details-modal.component.html',
  standalone: true,
  imports: [DatePipe,CommonModule],
  styleUrls: ['./flight-details-modal.component.css']
})
export class FlightDetailsModalComponent {
  @Input() flight: any;
  @Input() currency: string = 'USD';
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}
