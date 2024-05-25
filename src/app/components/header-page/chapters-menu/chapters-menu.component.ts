import { Component } from '@angular/core';
import { StoryService } from 'src/app/services/story.service';
import { Chapter } from 'src/app/models/story';
import { AuthService } from 'src/app/services/auth.service';
import { ChapterManagerComponent } from '../../chapter-manager/chapter-manager.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chapters-menu',
  templateUrl: './chapters-menu.component.html',
  styleUrl: './chapters-menu.component.scss'
})
export class ChaptersMenuComponent {

  chapters!: Chapter[];

  constructor(private storyService: StoryService, private authService: AuthService,
    public dialog: MatDialog, private router: Router) {
    this.storyService.updatedStoryEvent.subscribe(() => {
      this.chapters = this.storyService.chapters;
    });
  }

  get currentChapterOrder() {
    return this.storyService.chapterNumber;
  }

  changeChapter(chapterOrder: number) {
    this.router.navigate(['/chapitre/' + chapterOrder]);
  }

  get isAuthenticated() {
    return this.authService.isAuthenticated;
  }

  openManageChaptersForm(){
    this.dialog.open(ChapterManagerComponent).afterClosed().subscribe(() => {
      this.storyService.updatedStoryEvent.emit();
    });
  }



}
