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

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  annotations: Annotation[] = [];
  rawChapters: RawChapter[] = [];
  chapters: Chapter[] = [];
  currentChapterNumber = 1;

  updatedStoryEvent = new EventEmitter();
  changeChapterEvent = new EventEmitter();

  constructor(private api: ApiService, private settingsService: SettingsService, private route: ActivatedRoute,
    private location: Location) {
    this.getStoryData();
    this.settingsService.filtersChange.subscribe(() => {
      this.chapters = this.organizeChapters();
      this.updatedStoryEvent.emit();
    });

    this.route.queryParams.subscribe(params => {
      this.currentChapterNumber = (params['chapter']) ? parseInt(params['chapter']) : 1;
      console.log(this.currentChapterNumber);
      this.location.go('/', `chapter=${this.currentChapterNumber}`);
      this.changeChapterEvent.emit();
    });

  }

  get chapterNumber(): number {
    return this.currentChapterNumber;
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

  getChapter(order: number): Chapter | null {
    const chapter = this.chapters.find(c => c.order === order);
    return (chapter) ? chapter : null;
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
        order: rawChapter.order,
        title: rawChapter.title,
        sections: this.getSectionsFromRawChapter(rawChapter)
      };
      chapters.push(chapter);
    });
    chapters.sort((a, b) => a.order - b.order);
    return chapters;
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
      if (section.paragraphs.length > 0) sections.push(section);
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

  changeChapter(chapterOrder: number) {
    const chapter = this.getChapter(chapterOrder);
    if (chapter) {
      this.currentChapterNumber = chapterOrder;
      this.changeChapterEvent.emit();
    }
  }

}
