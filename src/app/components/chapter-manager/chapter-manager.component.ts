import { Component } from '@angular/core';
import { StoryService } from 'src/app/services/story.service';

export interface ChapterMetaData {
  title: string;
  order: number;
  id: number;
}
@Component({
  selector: 'app-chapter-manager',
  templateUrl: './chapter-manager.component.html',
  styleUrl: './chapter-manager.component.scss'
})

export class ChapterManagerComponent {

  chaptersMetadata!: ChapterMetaData[];
  displayedColumns = ['order', 'title'];


  constructor(private storyService: StoryService) { }

  ngOnInit() {
    this.chaptersMetadata = [];
    const chapters = this.storyService.chapters;
    for (const chapter of chapters) {
      const chapterMetadata:ChapterMetaData ={
        title: chapter.title,
        order: chapter.order,
        id: chapter.id
      }
      this.chaptersMetadata.push(chapterMetadata);
    }
  }

}
