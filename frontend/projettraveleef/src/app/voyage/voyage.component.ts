import { Component, OnInit } from '@angular/core';
import { VolService } from '../services/vol.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-voyage',
  imports: [CommonModule], 
  standalone: true,
  templateUrl: './voyage.component.html',
  styleUrls: ['./voyage.component.css']
})
export class VoyageComponent implements OnInit {
  vols: any[] = [];

  constructor(private volService: VolService) {}

  ngOnInit(): void {
    this.volService.getVols().subscribe((data) => {
      this.vols = data;
    });
  }
}
