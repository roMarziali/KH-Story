import { Component, Input } from '@angular/core';
import { StoryService } from 'src/app/services/story.service';

@Component({
  selector: 'app-move-chapter',
  templateUrl: './move-chapter.component.html',
  styleUrl: './move-chapter.component.scss'
})
export class MoveChapterComponent {

  nextChapter!: number | null;
  previousChapter!: number | null;

  constructor(private storyService: StoryService) {
    this.storyService.changeChapterEvent.subscribe((chapterNumber) => {
      this.setNextChapter();
      this.setPreviousChapter();
    });
    this.storyService.updatedStoryEvent.subscribe(() => {
      this.setNextChapter();
      this.setPreviousChapter();
    });
  }

  ngOnInit() {
    this.setNextChapter();
    this.setPreviousChapter();
  }

  setNextChapter() {
    this.nextChapter = null;
    const chaptersAfterCurrentChapter = [];
    for (const chapter of this.storyService.chapters) {
      if (chapter.order > this.storyService.chapterNumber && chapter.sections.length) {
        chaptersAfterCurrentChapter.push(chapter);
      }
    }
    if (chaptersAfterCurrentChapter.length) {
      chaptersAfterCurrentChapter.sort((a, b) => a.order - b.order);
      this.nextChapter = chaptersAfterCurrentChapter[0].order;
    }
  }

  setPreviousChapter() {
    this.previousChapter = null;
    const chaptersBeforeCurrentChapter = [];
    for (const chapter of this.storyService.chapters) {
      if (chapter.order < this.storyService.chapterNumber && chapter.sections.length) {
        chaptersBeforeCurrentChapter.push(chapter);
      }
    }
    if (chaptersBeforeCurrentChapter.length) {
      chaptersBeforeCurrentChapter.sort((a, b) => b.order - a.order);
      this.previousChapter = chaptersBeforeCurrentChapter[0].order;
    }
  }

  moveToChapter(chapterNumber: number) {
    this.storyService.changeChapter(chapterNumber);
  }
}
