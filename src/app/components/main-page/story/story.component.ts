import { Component } from '@angular/core';
import { StoryService } from 'src/app/services/story.service';
import { SettingsService } from 'src/app/services/settings.service';
import { Chapter } from 'src/app/models/chapter';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { StorySectionFormComponent } from './story-section-form/story-section-form.component';
import { TextFormMetadata } from 'src/app/models/text-form-identifier';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent {

  constructor(private storyService: StoryService, private settingsService: SettingsService, private authService: AuthService,
    private dialog: MatDialog, private api: ApiService) {
    this.storyService.updatedStoryEvent.subscribe(() => {
      this.loadChapter();
    });
    this.storyService.changeChapterEvent.subscribe(() => {
      this.loadChapter();
    });
  }

  chapter!: Chapter | null;

  get chapterId(): number {
    return this.storyService.currentChapterId;
  }


  getStoryFontSize(): string {
    return this.settingsService.storyFontSizeEm;
  }

  loadChapter() {
    this.chapter = this.storyService.getChapter();
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated;
  }

  openCreateSectionForm(previousSectionId: number) {
    const textFormMetadata:TextFormMetadata = {
      chapterId: this.chapterId,
      previousSectionId: previousSectionId
    }
    this.dialog.open(StorySectionFormComponent, {
      data: { textFormMetadata, action: "adding" },
      disableClose: true
    }).afterClosed().subscribe((data) => {
      if (data.modified) {
        this.storyService.getStoryData();
      }
    });
  }

  openEditSectionTitleForm(sectionId: number) {
    console.log(sectionId, "openEditSectionTitleForm");
  }

  deleteSection(sectionId: number) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette section ?")) {
      this.api.delete(`story/section/${this.chapterId}/${sectionId}`).subscribe(() => {
        this.storyService.getStoryData();
      });
    }
  }
}
