import { EventEmitter, Injectable } from '@angular/core';
import { Annotation } from '../models/annotation';
import { RawChapter } from '../models/raw-chapter';
import { RawSection } from '../models/raw-section';
import { ApiService } from './api.service';
import { SettingsService } from './settings.service';
import { Chapter } from '../models/chapter';
import { ChapterSection } from '../models/chapter-section';
import { ChapterSectionParagraph } from '../models/chapter-section-paragraph';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  annotations: Annotation[] = [];
  rawChapters: RawChapter[] = [];
  chapters: Chapter[] = [];
  firstChapterToDisplaySelected = false;

  updatedStoryEvent = new EventEmitter();

  constructor(private api: ApiService, private settingsService: SettingsService,
    private router: Router, private authService: AuthService) {
    this.getStoryData();
    this.settingsService.filtersChange.subscribe(() => {
      this.chapters = this.organizeChapters();
      this.updatedStoryEvent.emit();
    });
    this.authService.changeAuthenticationStatus.subscribe(() => {
      this.chapters = this.organizeChapters();
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
      this.api.get('story/story').subscribe((data) => {
        this.rawChapters = data;
        this.chapters = this.organizeChapters();
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

  organizeChapters(): Chapter[] {
    const chapters: Chapter[] = [];
    this.rawChapters.forEach(rawChapter => {
      rawChapter.sections.sort((a, b) => a.order - b.order);
      const chapter: Chapter = {
        id: rawChapter.id,
        order: rawChapter.order,
        title: rawChapter.title,
        sections: this.getSectionsFromRawChapter(rawChapter)
      };
      chapters.push(chapter);
    });
    chapters.sort((a, b) => a.order - b.order);
    return chapters;
  }

  changeChapter(newChapterOrder: number) {
    this.router.navigate(['/chapitre', newChapterOrder]);
    window.scrollTo(0, 0);
  }

  getSectionsFromRawChapter(rawChapter: RawChapter): ChapterSection[] {
    const sections: ChapterSection[] = [];
    rawChapter.sections.forEach(rawSection => {
      rawSection.paragraphs.sort((a, b) => a.order - b.order);
      const section: ChapterSection = {
        id: rawSection.id,
        title: rawSection.title,
        paragraphs: this.getParagraphsFromRawSection(rawSection)
      };
      // on autorise l'affichage des sections vides si l'utilisateur est connecté sinon il ne pourrait pas créer un paragraphe dans une section vide
      if (section.paragraphs.length > 0 || this.authService.isAuthenticated) sections.push(section);
    });
    return sections;
  }

  getParagraphsFromRawSection(rawSection: RawSection): ChapterSectionParagraph[] {
    const paragraphs: ChapterSectionParagraph[] = [];
    if (!rawSection.paragraphs.length) return paragraphs;
    const rawParagraphs = rawSection.paragraphs;

    rawParagraphs.forEach(rawParagraph => {
      const rawTexts = rawParagraph.texts;
      for (const rawText of rawTexts) {
        if (this.settingsService.isTextToDisplay(rawText.relatedTo)) {
          paragraphs.push({ id: rawParagraph.id, text: rawText.text, image: rawText.image });
          break;
        }
      }
    })
    return paragraphs;
  }

}
