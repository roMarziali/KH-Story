import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TextFormService } from 'src/app/services/text-form.service';
import { StoryService } from 'src/app/services/story.service';

@Component({
  selector: 'app-adding-text',
  templateUrl: './adding-text.component.html',
  styleUrl: './adding-text.component.scss'
})
export class AddingTextComponent {

  constructor(private authService: AuthService, private textFormService: TextFormService, private storyService: StoryService) { }

  @Input() previousTitle: number = 0;
  @Input() previousParagraph: number = 0;

  addTitle() {
    this.textFormService.addDisplayedTextForm({
      previousTitle: this.previousTitle,
      previousParagraph: this.previousParagraph,
      type: 'title',
      action: 'adding',
      chapterId: this.storyService.currentChapterId
    });
  }

  addParagraph() {
    this.textFormService.addDisplayedTextForm({
      previousTitle: this.previousTitle,
      previousParagraph: this.previousParagraph,
      type: 'paragraph',
      action: 'adding',
      chapterId: this.storyService.currentChapterId
    });
  }

  get isAuthenticated() {
    return this.authService.isAuthenticated;
  }

  get isDisplayedTextForm() {
    return this.textFormService.isDisplayedTextForm({
      previousTitle: this.previousTitle,
      previousParagraph: this.previousParagraph,
      action: 'adding',
      chapterId: this.storyService.currentChapterId
    });
  }

}
