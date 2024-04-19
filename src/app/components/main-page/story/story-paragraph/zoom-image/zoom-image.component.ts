import { Component, Inject } from '@angular/core';
import { Image } from 'src/app/models/chapter-section-paragraph';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-zoom-image',
  standalone: true,
  imports: [],
  templateUrl: './zoom-image.component.html',
  styleUrl: './zoom-image.component.scss'
})
export class ZoomImageComponent {

  image: Image = this.data.image;
  private apiImage: string = environment.apiImage;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { image: Image}){}


  get imageSource(): string {
    return `${this.apiImage}/original/${this.image.game}/${this.image.name}`.toLowerCase();
  }
}
