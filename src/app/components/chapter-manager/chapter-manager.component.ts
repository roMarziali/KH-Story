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
  dragDisabled = true;


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
    this.chaptersMetadata.push({
      title: "Nouveau chapitre",
      order: this.chaptersMetadata.length + 1,
      id: -1
    });
    this.table.renderRows();
  }

  deleteChapter(id: number) {
    this.chaptersMetadata = this.chaptersMetadata.filter(chapter => chapter.id !== id);
    this.redoChaptersOrder();
    this.table.renderRows();
  }

  onSubmit() {
    if (this.chaptersMetadata.some(chapter => chapter.title === "")) {
      alert("Un chapitre n'a pas de titre");
      return;
    }

    console.log(this.chaptersMetadata);
  }

  drop(event: CdkDragDrop<ChapterMetaData>) {
    this.dragDisabled = true;
    moveItemInArray(this.chaptersMetadata, event.previousIndex, event.currentIndex);
    this.redoChaptersOrder();
    this.table.renderRows();
  }

  redoChaptersOrder() {
    for(let i = 0; i < this.chaptersMetadata.length; i++) {
      this.chaptersMetadata[i].order = i+1;
    }
  }

}
