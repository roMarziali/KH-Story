import { Component, Input } from '@angular/core';
import { StoryService } from 'src/app/services/story.service';

@Component({
  selector: 'app-move-chapter',
  templateUrl: './move-chapter.component.html',
  styleUrl: './move-chapter.component.scss'
})
export class MoveChapterComponent {

  @Input() currentChapterNumber!: number;
  nextChapter!: number | null;
  previousChapter!: number | null;

  constructor(private storyService: StoryService) {
    this.storyService.changeChapterEvent.subscribe((chapterNumber) => {
      this.currentChapterNumber = chapterNumber;
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
    const chapters = this.storyService.chapters;
    const currentChapterIndex = chapters.findIndex(c => c.order === this.currentChapterNumber);
    for (let i = currentChapterIndex + 1; i < chapters.length; i++) {
      if (chapters[i].sections.length > 0) {
        this.nextChapter = chapters[i].order;
        return;
      }
    }
  }

  setPreviousChapter() {
    this.previousChapter = null;
    const chapters = this.storyService.chapters;
    const currentChapterIndex = chapters.findIndex(c => c.order === this.currentChapterNumber);
    for (let i = currentChapterIndex - 1; i >= 0; i--) {
      if (chapters[i].sections.length > 0) {
        this.previousChapter = chapters[i].order;
        return;
      }
    }
  }

  moveToChapter(chapterNumber: number) {
    this.storyService.changeChapter(chapterNumber);
  }
}
