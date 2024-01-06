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


  getAnnotation(id: number): string {
    const annotation = this.annotations.find(a => a.id === id);
    return annotation ? annotation.content : 'Erreur : annotation non trouvée';
  }

}
