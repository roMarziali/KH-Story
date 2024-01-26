import { Component, Input } from '@angular/core';
import { TextFormService } from 'src/app/services/text-form.service';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { StoryService } from 'src/app/services/story.service';
import { TextFormIdentifier } from 'src/app/models/text-form-identifier';

@Component({
  selector: 'app-text-form',
  templateUrl: './text-form.component.html',
  styleUrl: './text-form.component.scss'
})
export class TextFormComponent {

  @Input() textFormIdentifier!: TextFormIdentifier;
  @Input() text!: string;
  displayed: boolean = false;

  constructor(private textFormService: TextFormService, private authService: AuthService, private api: ApiService,
    private storyService: StoryService) {
    this.textFormService.displayedTextFormsChange.subscribe(() => {
      this.displayed = this.textFormService.isDisplayedTextForm(this.textFormIdentifier);
      this.textFormIdentifier.type = this.textFormService.getDisplayedTextFormType(this.textFormIdentifier);
    });
  }

  get isAuthenticated() {
    return this.authService.isAuthenticated;
  }

  onSubmit() {
    const chapterId = this.storyService.currentChapterId;
    this.api.post('story/text', { title: this.text, textFormIdentifier: this.textFormIdentifier }).subscribe((data) => {
      console.log(data);
    });
  }

  cancel() {
    this.text = '';
    this.textFormService.removeDisplayedTextForm(this.textFormIdentifier);
  }

}
