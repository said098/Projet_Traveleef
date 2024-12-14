export interface Etape {
  mode: string;
  compagnie: string;
  depart: string;
  arrivee: string;
  heure_depart: string;
  heure_arrivee: string;
  latitude: number;
  longitude: number;
  latitude_arrivee: number;
  longitude_arrivee: number;
}

export interface Trajet {
  id: number;
  type: string;
  compagnie?: string;
  trajet: string;
  date: string;
  heure?: string;
  terminal?: string;
  gare?: string;
  gare_routiere?: string;
  latitude?: number;  
  longitude?: number; 
  latitude_arrivee?: number; 
  longitude_arrivee?: number; 
  etapes?: Etape[]; 
}
