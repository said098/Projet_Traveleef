import { Component, OnInit, OnDestroy, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VolService } from '../services/vol.service';
import * as L from 'leaflet';
import { CommonModule } from '@angular/common';
import { Trajet } from '../models/trajet.model';

@Component({
  selector: 'app-vol-details',
  templateUrl: './vol-details.component.html',
  styleUrls: ['./vol-details.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class VolDetailsComponent implements OnInit, OnDestroy, AfterViewInit {
  vol: Trajet | undefined; 
  map: L.Map | undefined;

  constructor(
    private route: ActivatedRoute,
    private volService: VolService,
    private elRef: ElementRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const volId = parseInt(id, 10);
      this.volService.getVols().subscribe(
        (vols: Trajet[]) => {
          this.vol = vols.find((vol) => vol.id === volId);
          if (this.vol) {
            setTimeout(() => {
              if (this.vol) { 
                this.initializeMap(this.vol);
              }
            }, 100);
          }
           else {
            console.error('Vol introuvable pour l\'ID donné.');
          }
        },
        (error) => {
          console.error('Erreur lors de la récupération des détails du vol :', error);
        }
      );
    }
  }

  ngAfterViewInit(): void {
    const mapContainer = this.elRef.nativeElement.querySelector('.map-container');
    if (!mapContainer) {
      console.warn('Le conteneur de la carte est introuvable.');
    }
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  private initializeMap(vol: Trajet): void {
    const mapContainer = this.elRef.nativeElement.querySelector('.map-container');

    if (mapContainer && !this.map) {
      this.map = L.map(mapContainer, {
        center: [48.8566, 2.3522], 
        zoom: 6,
        maxZoom: 18,
        minZoom: 2,
        zoomControl: true
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    
      }).addTo(this.map);

      this.displayRouteFromJson(vol);
    } else if (!mapContainer) {
      console.error('Le conteneur de la carte n\'a pas été trouvé.');
    }
  }

  private displayRouteFromJson(trajet: Trajet): void {
    if (trajet.latitude && trajet.longitude && trajet.latitude_arrivee && trajet.longitude_arrivee) {
      const startPoint: L.LatLngExpression = [trajet.latitude, trajet.longitude];
      const endPoint: L.LatLngExpression = [trajet.latitude_arrivee, trajet.longitude_arrivee];

      const customIcon = L.icon({
        iconUrl: 'assets/images/LogoTraveleefgreen.png', 
        iconSize: [40, 40], 
        iconAnchor: [20, 15],
        popupAnchor: [0, -10]
      });

      
      L.marker(startPoint, { icon: customIcon })
        .addTo(this.map!)
        .bindPopup(`Départ : ${trajet.trajet.split(' - ')[0]}`);

      
      L.marker(endPoint, { icon: customIcon })
        .addTo(this.map!)
        .bindPopup(`Arrivée : ${trajet.trajet.split(' - ')[1]}`);

      
      const route = L.polyline([startPoint, endPoint], {
        color: 'red',
        weight: 4,
        opacity: 0.7
      }).addTo(this.map!);

      this.map!.fitBounds(route.getBounds());
    } else {
      console.error('Coordonnées manquantes pour le trajet.');
    }
  }

  goBack(): void {
    window.history.back();
  }
}
