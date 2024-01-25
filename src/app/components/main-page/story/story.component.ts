import { Component } from '@angular/core';
import { StoryService } from 'src/app/services/story.service';
import { SettingsService } from 'src/app/services/settings.service';
import { Chapter } from 'src/app/models/chapter';
@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent {

  constructor(private storyService: StoryService, private settingsService: SettingsService) {
    this.storyService.updatedStoryEvent.subscribe(() => {
      this.loadChapter();
    });
    this.storyService.changeChapterEvent.subscribe(() => {
      this.loadChapter();
    });
  }

  chapter: Chapter | null = null;


  getStoryFontSize(): string {
    return this.settingsService.storyFontSizeEm;
  }

  loadChapter() {
    this.chapter = this.storyService.getChapter(this.storyService.chapterNumber);
  }
}
