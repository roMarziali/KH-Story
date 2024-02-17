import { Component, ViewChild } from '@angular/core';
import { StoryService } from 'src/app/services/story.service';
import { CdkDragDrop, moveItemInArray, CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { MatTable } from '@angular/material/table';

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
  @ViewChild('table', { static: true }) table!: MatTable<ChapterMetaData>;

  chaptersMetadata!: ChapterMetaData[];
  displayedColumns = ['order', 'title', 'delete'];


  constructor(private storyService: StoryService) { }

  ngOnInit() {
    this.chaptersMetadata = [];
    const chapters = this.storyService.chapters;
    for (const chapter of chapters) {
      const chapterMetadata: ChapterMetaData = {
        title: chapter.title,
        order: chapter.order,
        id: chapter.id
      }
      this.chaptersMetadata.push(chapterMetadata);
    }
  }

  addChapter() {
    console.log("add chapter");
  }

  deleteChapter(id: number) {
    console.log("delete chapter", id);
  }

  onSubmit() {
    console.log(this.chaptersMetadata);
  }

  drop(event: CdkDragDrop<ChapterMetaData>) {
    moveItemInArray(this.chaptersMetadata, event.previousIndex, event.currentIndex);
    for(let i = 0; i < this.chaptersMetadata.length; i++) {
      this.chaptersMetadata[i].order = i+1;
    }
    this.table.renderRows();
  }

}
