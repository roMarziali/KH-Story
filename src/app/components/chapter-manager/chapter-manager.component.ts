import { Component } from '@angular/core';
import { StoryService } from 'src/app/services/story.service';

@Component({
  selector: 'app-chapter-manager',
  templateUrl: './chapter-manager.component.html',
  styleUrl: './chapter-manager.component.scss'
})

export class ChapterManagerComponent {



  constructor(private storyService: StoryService) {  }

  ngOnInit(){
    console.log(this.storyService.chapters);
  }

}
