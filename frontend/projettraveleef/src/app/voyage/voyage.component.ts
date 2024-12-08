import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VolService } from '../services/vol.service';

export interface Vol {
  id: number;
  compagnie: string;
  trajet: string;
  date: string;
  heure: string;
  terminal: string;
}

@Component({
  selector: 'app-voyage',
  templateUrl: './voyage.component.html',
  styleUrls: ['./voyage.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class VoyageComponent implements OnInit {
  vols: Vol[] = []; 

  constructor(private volService: VolService) {}

  ngOnInit(): void {
    this.volService.getVols().subscribe(
      (data: Vol[]) => {
        this.vols = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des vols :', error);
      }
    );
  }

  getLogoUrl(compagnie: string): string {
    const predefinedDomains: { [key: string]: string } = {
      'Air France': 'airfrance.com',
      'British Airways': 'ba.com',
      'Lufthansa': 'lufthansa.com',
      'Norwegian Air': 'norvegian.com',
    };

    const domain =
      predefinedDomains[compagnie] ||
      compagnie.replace(/\s+/g, '').toLowerCase() + '.com';

    return `https://logo.clearbit.com/${domain}`;
  }

  onLogoError(event: Event): void {
    (event.target as HTMLImageElement).src = 'assets/images/default-logo.png';
  }

  goBack(): void {
    window.history.back();
  }
}
