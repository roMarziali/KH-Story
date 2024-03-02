import { Component } from '@angular/core';
import games from 'src/assets/data/games.json';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-image-form',
  templateUrl: './image-form.component.html',
  styleUrl: './image-form.component.scss'
})
export class ImageFormComponent {

  games = games;
  imageName: string = '';
  imageFile: File | null = null;
  gameId: string = '';

  constructor(private api: ApiService) { }

  onImageSelected(event: any) {
    if (event.target.files.length > 0) {
      this.imageFile = event.target.files[0];
    }
  }

  onSubmit() {
    if (!this.imageFile || !this.imageName || !this.gameId) {
      return;
    }
    const testImageName = this.testImageName();
    if (!testImageName) {
      alert("Format incorrect pour le nom de fichier")
      return;
    }
    const formData = new FormData();
    formData.append('image', this.imageFile);
    formData.append('name', this.imageName);
    formData.append('gameId', this.gameId);
    this.api.post('story/image', formData).subscribe((res) => {
      console.log(res);
    });
  }

  testImageName() {
    const regex = new RegExp('^[a-z0-9-]{3,}(?<!-)$');
    return regex.test(this.imageName);
  }



}
