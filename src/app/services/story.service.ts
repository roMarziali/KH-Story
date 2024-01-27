import { EventEmitter, Injectable } from '@angular/core';
import { Annotation } from '../models/annotation';
import { RawChapter } from '../models/raw-chapter';
import { RawSection } from '../models/raw-section';
import { ApiService } from './api.service';
import { SettingsService } from './settings.service';
import { Chapter } from '../models/chapter';
import { ChapterSection } from '../models/chapter-section';
import { ChapterSectionParagraph } from '../models/chapter-section-paragraph';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TextFormService } from './text-form.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  annotations: Annotation[] = [];
  rawChapters: RawChapter[] = [];
  chapters: Chapter[] = [];
  currentChapterOrder!: number;

  updatedStoryEvent = new EventEmitter();
  changeChapterEvent = new EventEmitter();

  constructor(private api: ApiService, private settingsService: SettingsService, private route: ActivatedRoute,
    private location: Location, private textFormService: TextFormService, private authService: AuthService) {
    this.getStoryData();
    this.settingsService.filtersChange.subscribe(() => {
      this.chapters = this.organizeChapters();
      this.updatedStoryEvent.emit();
    });
  }

  get chapterNumber(): number {
    return this.currentChapterOrder;
  }

  getStoryData() {
    this.api.get('story/annotations').subscribe((data) => {
      this.annotations = data
      // Récupération des chapitres après les annotations car les chapitres vont utiliser les annotations
      this.api.get('story/story').subscribe((data) => {
        this.rawChapters = data;
        this.chapters = this.organizeChapters();
        this.updatedStoryEvent.emit();
        const currentChapterOrder = this.route.snapshot.queryParamMap.get('chapter');
        if (currentChapterOrder) {
          this.changeChapter(Number(currentChapterOrder));
        } else {
          this.changeChapter(1);
        }
      });
    });
  }

  getAnnotation(id: number): string {
    const annotation = this.annotations.find(a => a.id === id);
    return annotation ? annotation.content : 'Erreur : annotation non trouvée';
  }

  getChapter(chapterOrder?: number): Chapter | null {
    const chapterToSearch: number = (chapterOrder) ? chapterOrder : this.currentChapterOrder;
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
    const chapter = this.getChapter(newChapterOrder);
    if (chapter) {
      this.currentChapterOrder = newChapterOrder;
      this.location.go('/', `chapter=${this.currentChapterOrder}`);
      this.textFormService.undisplayAllTextForms();
      this.changeChapterEvent.emit();
    }
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
      if (section.paragraphs.length > 0 || this.authService.isAuthenticated) sections.push(section);
      // on autorise l'affichage des sections vides si l'utilisateur est connecté sinon il ne pourrait pas créer un paragraphe dans une section vide
    });
    return sections;
  }

  getParagraphsFromRawSection(rawSection: RawSection): ChapterSectionParagraph[] {
    const paragraphs: ChapterSectionParagraph[] = [];
    rawSection.paragraphs.forEach(rawParagraph => {
      for (const rawText of rawParagraph.texts) {
        if (this.settingsService.isAtLeastOneFilterSelected(rawText.relatedTo)) {
          paragraphs.push({ id: rawText.id, text: rawText.text, image: rawText.image });
          break;
        }
      }
    });
    return paragraphs;
  }

}
