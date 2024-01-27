import { Component, Input } from '@angular/core';
import { TextFormService } from 'src/app/services/text-form.service';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { TextFormMetadata } from 'src/app/models/text-form-identifier';
import { FormGroup, FormControl, Validators, ValidationErrors } from "@angular/forms";

@Component({
  selector: 'app-text-form',
  templateUrl: './text-form.component.html',
  styleUrl: './text-form.component.scss'
})
export class TextFormComponent {

  @Input() textFormMetadata!: TextFormMetadata;
  displayed: boolean = false;
  isLoading: boolean = false;
  titleForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  constructor(private textFormService: TextFormService, private authService: AuthService, private api: ApiService) {
    this.textFormService.displayedTextFormsChange.subscribe(() => {
      this.displayed = this.textFormService.isDisplayedTextForm(this.textFormMetadata);
      this.textFormMetadata.type = this.textFormService.getDisplayedTextFormType(this.textFormMetadata);
    });
  }

  get isAuthenticated() {
    return this.authService.isAuthenticated;
  }

  get submitButtonText() {
    return this.textFormMetadata.action === 'editing' ? 'Modifier' : 'Ajouter';
  }

  onSubmitTitle() {
    if (this.titleForm.invalid) return;
    this.isLoading = true;
    this.api.post('story/title', { value: this.titleForm.value, textFormMetadata: this.textFormMetadata }).subscribe((data) => {
      if (data.status == "ok") {
        this.isLoading = false;
        this.titleForm.reset();
        this.textFormService.modifiedStoryEvent.emit();
        this.textFormService.undisplayedTextForm(this.textFormMetadata);
      }
    });
  }

  onCancelTitle() {
    this.titleForm.reset();
    this.textFormService.undisplayedTextForm(this.textFormMetadata);
  }
}
