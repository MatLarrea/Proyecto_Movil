import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage-angular";

@Injectable({
    providedIn: 'root'
})

export class StorageService{

    //Creamos una instancia de storage que puede ser nula
    private _storage: Storage | null = null;

    constructor(private storage: Storage){
        this.init();
    }

    // Creación de Ionic storage mediante metodo create de storage-angular
    async init(){
        const storage = await this.storage.create();
        this._storage = storage;
    }

    //Guardar en persistencia   
    public async set(key: string, value: any): Promise<any> {
        if(!this._storage) {
            await this.init();
        }
        return this._storage?.set(key, value);
    }

    //Obtener datos de persistencia
    public async get(key: string): Promise<any> {
        if(!this._storage){
            await this.init();
        }
        return this._storage?.get(key);
    }

    //Eliminar datos persistencia
    public async remove(key: string): Promise<any>{
        if(!this._storage){
            await this.init();
        }
        return this._storage?.remove(key);
    }

    //Limpiar persistencia
    public async clear(): Promise<void> {
        if(!this._storage){
            await this.init();
        }
        return this._storage?.clear();
    }

}