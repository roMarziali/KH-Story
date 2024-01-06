import { Injectable } from '@angular/core';
import { Annotation } from '../models/annotation';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AnnotationsService {

  annotations: Annotation[] = [];
  constructor(private api: ApiService) { }

  getAnnotations() {
    this.api.get('story/annotations').subscribe((data) => {
      this.annotations = data
    });
  }


  setAnnotationsInText(string: string) {
    const searchAnnotation = /\[annotation:(\d+)\]/g;
    let match;
    while ((match = searchAnnotation.exec(string)) !== null) {
      const id = parseInt(match[1]);
      const correspondingAnnotation = this.annotations.find(a => a.id === id);
      if (!correspondingAnnotation) {
        string = string.replace(match[0], `<span matTooltip="Erreur : annotation manquante">`);
      } else {
        string = string.replace(match[0], `<span matTooltip="${correspondingAnnotation.content}">`);
      }
    }
    const searchEndAnnotation = /\[\/annotation\]/g;
    string = string.replace(searchEndAnnotation, '</span>');
    return string;
  }

}
