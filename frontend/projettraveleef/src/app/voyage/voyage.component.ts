import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-voyage',
  standalone: true, 
  imports: [CommonModule], 
  templateUrl: './voyage.component.html',
  styleUrls: ['./voyage.component.css']
})
export class VoyageComponent {
  voyages = [
    { trajet: 'Paris - Londres', date: '10/10/2003' },
    { trajet: 'Paris - New York', date: '11/05/2003' },
    { trajet: 'Berlin - Paris', date: '01/08/2020' },
    { trajet: 'Oslo - Paris', date: '01/08/2020' }
  ];
}
