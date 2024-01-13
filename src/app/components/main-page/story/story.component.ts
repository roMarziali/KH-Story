import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { StoryService } from 'src/app/services/story.service';
import { SettingsService } from 'src/app/services/settings.service';
import { Chapter } from 'src/app/models/chapter';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent {

  constructor(private api: ApiService, private storyService: StoryService, private settingsService: SettingsService, private route: ActivatedRoute) { }

  chapter: Chapter | null = null;
  chapterNumber!: number;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.chapterNumber = (params['chapter']) ? parseInt(params['chapter']) : 1;
    });
    this.storyService.updatedStoryEvent.subscribe(() => {
      this.loadChapter();
    });
  }

  getStoryFontSize(): string {
    return this.settingsService.storyFontSizeEm;
  }

  loadChapter() {
    this.chapter = this.storyService.getChapter(this.chapterNumber);
  }
}
