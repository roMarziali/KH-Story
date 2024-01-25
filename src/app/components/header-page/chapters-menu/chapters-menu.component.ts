import { Component } from '@angular/core';
import { StoryService } from 'src/app/services/story.service';
import { Chapter } from 'src/app/models/chapter';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-chapters-menu',
  templateUrl: './chapters-menu.component.html',
  styleUrl: './chapters-menu.component.scss'
})
export class ChaptersMenuComponent {

  chapters!: Chapter[];
  currentChapterOrder!: number;

  constructor(private storyService: StoryService, private authService: AuthService) {
    this.storyService.updatedStoryEvent.subscribe(() => {
      this.chapters = this.storyService.chapters;
    });
    this.storyService.changeChapterEvent.subscribe((chapterNumber) => {
      this.currentChapterOrder = chapterNumber;
    });
  }

  changeChapter(chapterOrder: number) {
    this.storyService.changeChapter(chapterOrder);
  }

  get isAuthenticated() {
    return this.authService.isAuthenticated;
  }




}
