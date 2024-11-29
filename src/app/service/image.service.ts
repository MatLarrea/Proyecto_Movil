import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { uploadUserPhotoUseCase } from '../use-cases/upload-user-photo.use-case';

@Injectable({
  providedIn: 'root',
})

export class ImageService {

  constructor(private uploadUserPhotoUseCase: uploadUserPhotoUseCase) { }

  async getImageFromCamera(): Promise<{ success: boolean, message: string, imageUrl?: string }> {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
      });

      const imageUrl = `data:image/${image.format};base64,${image.base64String}`;
      return await this.uploadImage(imageUrl);
    } catch (error) {
      return { success: false, message: 'Error al obtener la imagen de la cámara.' };
    }
  }

  async getImageFromGallery(): Promise<{ success: boolean, message: string, imageUrl?: string }> {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Photos,
      });

      const imageUrl = `data:image/${image.format};base64,${image.base64String}`;
      return await this.uploadImage(imageUrl);
    } catch (error) {
      return { success: false, message: 'Error al obtener la imagen de la galería.' };
    }
  }

  private async uploadImage(imageUrl: string): Promise<{ success: boolean, message: string, imageUrl?: string }> {
    const uploadResult = await this.uploadUserPhotoUseCase.uploadUserPhoto(imageUrl)
    if (uploadResult.success) {
      return { success: true, message: 'Imagen subida con éxito', imageUrl: imageUrl };
    } else {
      return { success: false, message: uploadResult.message };
    }
  }

}