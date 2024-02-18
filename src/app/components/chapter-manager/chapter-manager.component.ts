import { Component, ViewChild } from '@angular/core';
import { StoryService } from 'src/app/services/story.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatTable } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { MatDialogRef } from "@angular/material/dialog";

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
  isLoading: boolean = false;


  constructor(private storyService: StoryService, private api: ApiService, private dialogRef: MatDialogRef<any>) { }

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
    const maxId = Math.max(...this.chaptersMetadata.map(chapter => chapter.id));
    this.chaptersMetadata.push({
      title: "",
      order: this.chaptersMetadata.length + 1,
      id: maxId + 1
    });
    this.table.renderRows();
    const tableContainer = document.getElementById('table-container');
    tableContainer?.scrollTo(0, tableContainer.scrollHeight);
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

    this.api.post('story/chapters-manager', { chaptersMetadata: this.chaptersMetadata }).subscribe((data) => {
      if (data.status == "ok") {
        this.isLoading = false;
        this.storyService.getStoryData();
        this.dialogRef.close();
      } else {
        alert("Erreur lors de la sauvegarde");
      }
    });

  }

  drop(event: CdkDragDrop<ChapterMetaData>) {
    this.dragDisabled = true;
    moveItemInArray(this.chaptersMetadata, event.previousIndex, event.currentIndex);
    this.redoChaptersOrder();
    this.table.renderRows();
  }

  redoChaptersOrder() {
    for (let i = 0; i < this.chaptersMetadata.length; i++) {
      this.chaptersMetadata[i].order = i + 1;
    }
  }

}
