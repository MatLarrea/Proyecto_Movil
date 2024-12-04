import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor() { }

  async getCurrentLocation(): Promise<{ latitude: number; longitude: number}>{

    try{
        const position = await Geolocation.getCurrentPosition();
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        return {latitude, longitude}
    }catch{
        throw new console.error('Problema al obtener la ubicación');
        
    }
  }
  async reverseGeocode(latitude: number, longitude: number): Promise<string> {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`
      );
      const data = await response.json();

      const city = data.address?.city || data.address?.town || data.address?.village || 'Ciudad desconocida';
      const country = data.address?.country || 'País desconocido';

      return `${city}, ${country}`;
    } catch (error) {
      console.error('Error al traducir coordenadas a ciudad/país:', error);
      throw error;
    }
  }
}
