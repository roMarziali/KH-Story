import { Component } from '@angular/core';
import { StoryService } from 'src/app/services/story.service';
import { SettingsService } from 'src/app/services/settings.service';
import { Chapter } from 'src/app/models/chapter';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent {

  constructor(private storyService: StoryService, private settingsService: SettingsService, private route: ActivatedRoute,
    private location: Location) {
    this.storyService.updatedStoryEvent.subscribe(() => {
      this.loadChapter();
    });
    this.storyService.changeChapterEvent.subscribe((chapterNumber) => {
      this.chapterNumber = chapterNumber;
      this.location.go('/', `chapter=${chapterNumber}`);
      this.loadChapter();
    });
  }

  chapter: Chapter | null = null;
  chapterNumber!: number;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.chapterNumber = (params['chapter']) ? parseInt(params['chapter']) : 1;
      this.location.go('/', `chapter=${this.chapterNumber}`);
      this.storyService.changeChapterEvent.emit(this.chapterNumber);
    });
  }

  getStoryFontSize(): string {
    return this.settingsService.storyFontSizeEm;
  }

  loadChapter() {
    this.chapter = this.storyService.getChapter(this.chapterNumber);
  }
}
