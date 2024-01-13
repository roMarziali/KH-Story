import { Component } from '@angular/core';
import { StoryService } from 'src/app/services/story.service';

@Component({
  selector: 'app-chapters-menu',
  templateUrl: './chapters-menu.component.html',
  styleUrl: './chapters-menu.component.scss'
})
export class ChaptersMenuComponent {

  chapters!: { order: number, title: string }[];

  constructor(private storyService: StoryService) {
    this.storyService.updatedStoryEvent.subscribe(() => {
      this.chapters = this.storyService.getChaptersOrderAndTitle();
    });
  }



}
