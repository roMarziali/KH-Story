import { Component, Input } from '@angular/core';
import { TextFormService } from 'src/app/services/text-form.service';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { StoryService } from 'src/app/services/story.service';
import { TextFormMetadata } from 'src/app/models/text-form-identifier';

@Component({
  selector: 'app-text-form',
  templateUrl: './text-form.component.html',
  styleUrl: './text-form.component.scss'
})
export class TextFormComponent {

  @Input() TextFormMetadata!: TextFormMetadata;
  @Input() text!: string;
  displayed: boolean = false;

  constructor(private textFormService: TextFormService, private authService: AuthService, private api: ApiService,
    private storyService: StoryService) {
    this.textFormService.displayedTextFormsChange.subscribe(() => {
      this.displayed = this.textFormService.isDisplayedTextForm(this.TextFormMetadata);
      this.TextFormMetadata.type = this.textFormService.getDisplayedTextFormType(this.TextFormMetadata);
    });
  }

  get isAuthenticated() {
    return this.authService.isAuthenticated;
  }

  onSubmit() {
    const chapterId = this.storyService.currentChapterId;
    this.api.post('story/text', { title: this.text, TextFormMetadata: this.TextFormMetadata }).subscribe((data) => {
      console.log(data);
    });
  }

  cancel() {
    this.text = '';
    this.textFormService.removeDisplayedTextForm(this.TextFormMetadata);
  }

}
