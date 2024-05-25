import { Component, HostListener } from '@angular/core';
import { StoryService } from 'src/app/services/story.service';
import { SettingsService } from 'src/app/services/settings.service';
import { Story, Chapter, ChapterSection, Paragraph } from 'src/app/models/story';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { StorySectionFormComponent } from './story-section-form/story-section-form.component';
import { StoryParagraphFormComponent } from './story-paragraph-form/story-paragraph-form.component';
import { TextFormMetadata } from 'src/app/models/text-form-identifier';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent {

  displayTopButton: boolean = false;
  chapter!: Chapter | null;

  constructor(private storyService: StoryService, private settingsService: SettingsService, private authService: AuthService,
    private dialog: MatDialog, private api: ApiService, private router: Router) {
    this.router.events.subscribe(() => {
      this.loadChapter();
    });
    this.storyService.updatedStoryEvent.subscribe(() => {
      this.loadChapter();
    });
  }

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
    const textFormMetadata: TextFormMetadata = {
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
    const textFormMetadata: TextFormMetadata = {
      chapterId: this.chapterId,
      sectionId: sectionId
    }
    this.dialog.open(StorySectionFormComponent, {
      data: { textFormMetadata, action: "editing", title: this.chapter?.sections.find(s => s.id === sectionId)?.title },
      disableClose: true
    }).afterClosed().subscribe((data) => {
      if (data.modified) {
        this.storyService.getStoryData();
      }
    });
  }

  deleteSection(sectionId: number) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette section ?")) {
      this.api.delete(`story/section/${this.chapterId}/${sectionId}`).subscribe(() => {
        this.storyService.getStoryData();
      });
    }
  }

  openCreateParagraphForm(sectionId: number, previousParagraphId: number) {
    const textFormMetadata: TextFormMetadata = {
      chapterId: this.chapterId,
      sectionId,
      previousParagraphId
    }
    this.dialog.open(StoryParagraphFormComponent, {
      data: { textFormMetadata, action: "adding" },
      disableClose: true
    }).afterClosed().subscribe((data) => {
      if (data.modified) {
        this.storyService.getStoryData();
      }
    });
  }

  openEditParagraphForm(sectionId: number, paragraphId: number) {
    this.api.get(`story/paragraph/${this.chapterId}/${sectionId}/${paragraphId}`).subscribe((paragraph: Paragraph) => {
      const textFormMetadata: TextFormMetadata = {
        chapterId: this.chapterId,
        sectionId,
        paragraphId
      }
      this.dialog.open(StoryParagraphFormComponent, {
        data: { textFormMetadata, action: "editing", paragraph },
        disableClose: true
      }).afterClosed().subscribe((data) => {
        if (data.modified) {
          this.storyService.getStoryData();
        }
      });
    });
  }

  deleteParagraph(sectionId: number, paragraphId: number) {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce paragraphe ?")) {
      this.api.delete(`story/paragraph/${this.chapterId}/${sectionId}/${paragraphId}`).subscribe(() => {
        this.storyService.getStoryData();
      });
    }
  }

  @HostListener('window:scroll', ['$event']) getScrollHeight(event: Event) {
    if (window.scrollY > 100) {
      this.displayTopButton = true;
    } else {
      this.displayTopButton = false;
    }
  }

  goOnTopPage() {
    window.scrollTo(0, 0);
  }

}

