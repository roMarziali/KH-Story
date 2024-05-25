import { EventEmitter, Injectable } from '@angular/core';
import { Annotation } from '../models/annotation'
import { Story, Chapter, ChapterSection, Paragraph, Image } from '../models/story';
import { ApiService } from './api.service';
import { SettingsService } from './settings.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  annotations: Annotation[] = [];
  chapters: Chapter[] = [];
  firstChapterToDisplaySelected = false;

  updatedStoryEvent = new EventEmitter();

  constructor(private api: ApiService, private settingsService: SettingsService,
    private router: Router, private authService: AuthService) {
    this.getStoryData();
    this.authService.changeAuthenticationStatus.subscribe(() => {
      this.chapters.sort((a, b) => a.order - b.order);
      this.updatedStoryEvent.emit();
    });
  }

  get chapterNumber(): number {
    return Number(this.router.url.split('/')[2]);
  }

  getStoryData() {
    this.api.get('story/annotations').subscribe((data) => {
      this.annotations = data
      // Récupération des chapitres après les annotations car les chapitres vont utiliser les annotations
      this.api.get('story/story').subscribe((data: Chapter[]) => {
        this.chapters = data;
        this.updatedStoryEvent.emit();
      });
    });
  }

  getAnnotation(id: number): string {
    const annotation = this.annotations.find(a => a.id === id);
    return annotation ? annotation.content : 'Erreur : annotation non trouvée';
  }

  getChapter(): Chapter | null {
    const chapterToSearch = Number(this.chapterNumber);
    const chapter = this.chapters.find(c => c.order === chapterToSearch);
    return (chapter) ? chapter : null;
  }

  get currentChapterId(): number {
    const chapterId = this.getChapter()?.id;
    return (chapterId) ? chapterId : 0;
  }

  getChaptersOrderAndTitle() {
    const chapters = this.chapters.map(c => {
      return {
        order: c.order,
        title: c.title
      }
    });
    chapters.sort((a, b) => a.order - b.order);
    return chapters;
  }

  changeChapter(newChapterOrder: number) {
    this.router.navigate(['/chapitre', newChapterOrder]);
    window.scrollTo(0, 0);
  }
}
