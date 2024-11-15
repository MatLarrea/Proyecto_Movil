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
}
