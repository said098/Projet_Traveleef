import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as L from 'leaflet'; // Importation de Leaflet
import { VolService } from '../services/vol.service';
import { Vol } from '../voyage/voyage.component';

@Component({
  selector: 'app-vol-details',
  templateUrl: './vol-details.component.html',
  styleUrls: ['./vol-details.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class VolDetailsComponent implements OnInit, OnDestroy {
  vol: Vol | undefined;
  map: L.Map | undefined; // Référence à la carte Leaflet

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private volService: VolService,
    private elRef: ElementRef // Utilisé pour cibler le conteneur de la carte
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const volId = parseInt(id, 10);
      this.volService.getVols().subscribe(
        (vols: Vol[]) => {
          this.vol = vols.find((vol) => vol.id === volId);
          if (this.vol) {
            this.initializeMap(this.vol); // Initialisation de la carte avec les coordonnées du vol
          }
        },
        (error) => {
          console.error('Erreur lors de la récupération des détails du vol :', error);
        }
      );
    }
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove(); // Nettoie la carte lorsque le composant est détruit
    }
  }

  private initializeMap(vol: Vol): void {
    setTimeout(() => {
      const mapContainer = this.elRef.nativeElement.querySelector('.map-container');
      if (mapContainer && !this.map) {
        this.map = L.map(mapContainer).setView([vol.latitude, vol.longitude], 10);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
        }).addTo(this.map);
  
        L.marker([vol.latitude, vol.longitude])
          .addTo(this.map)
          .bindPopup(`Destination : ${vol.trajet}`)
          .openPopup();
      }
    }, 100); // Retarde l’exécution de 100ms
  }
  

  goBack(): void {
    window.history.back();
  }
}
