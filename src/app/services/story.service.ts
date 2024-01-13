import { EventEmitter, Injectable } from '@angular/core';
import { Annotation } from '../models/annotation';
import { Chapter } from '../models/chapter';
import { ApiService } from './api.service';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  annotations: Annotation[] = [];
  chapters: Chapter[] = [];

  updatedStoryEvent = new EventEmitter();

  constructor(private api: ApiService, private settingsService: SettingsService) {
    this.getStoryData();
  }

  getStoryData() {
    this.api.get('story/annotations').subscribe((data) => {
      this.annotations = data
      // Récupération des chapitres après les annotations car les chapitres vont utiliser les annotations
      this.api.get('story/chapters').subscribe((data) => {
        this.chapters = data
        this.updatedStoryEvent.emit();
      });
    });
  }

  getAnnotation(id: number): string {
    const annotation = this.annotations.find(a => a.id === id);
    return annotation ? annotation.content : 'Erreur : annotation non trouvée';
  }

  getChapter(order: number): Chapter | null {
    const chapter = this.chapters.find(c => c.order === order);
    return (chapter) ? chapter : null;
  }

  getChaptersOrderAndTitle(){
    const chapters = this.chapters.map(c => {
      return {
        order: c.order,
        title: c.title
      }
    });
    chapters.sort((a, b) => a.order - b.order);
    return chapters;
  }

}
