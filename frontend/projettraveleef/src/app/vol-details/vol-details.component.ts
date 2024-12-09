import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VolService } from '../services/vol.service';
import { Vol } from '../voyage/voyage.component';

@Component({
  selector: 'app-vol-details',
  templateUrl: './vol-details.component.html',
  styleUrls: ['./vol-details.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class VolDetailsComponent implements OnInit {
  vol: Vol | undefined; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private volService: VolService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); 
    if (id) {
      const volId = parseInt(id, 10); 
      this.volService.getVols().subscribe(
        (vols: Vol[]) => {
          this.vol = vols.find((vol) => vol.id === volId);
        },
        (error) => {
          console.error('Erreur lors de la récupération des détails du vol :', error);
        }
      );
    }
  }

  goBack(): void {
    window.history.back();
  }
}
