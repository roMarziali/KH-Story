import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TextFormService } from 'src/app/services/text-form.service';
import { TextFormMetadata } from 'src/app/models/text-form-identifier';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormControl, Validators, ValidationErrors } from "@angular/forms";

@Component({
  selector: 'app-adding-text',
  templateUrl: './adding-text.component.html',
  styleUrl: './adding-text.component.scss'
})
export class AddingTextComponent {

  isLoading: boolean = false;

  constructor(private authService: AuthService, private textFormService: TextFormService, private api: ApiService) { }
  @Input() textFormMetadata!: TextFormMetadata;

  addSection() {
    this.textFormService.addDisplayedTextForm(this.textFormMetadata);
  }

  get isAuthenticated() {
    return this.authService.isAuthenticated;
  }

  get isDisplayedTextForm() {
    return this.textFormService.isDisplayedTextForm(this.textFormMetadata);
  }

  titleForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  get submitButtonText() {
    return this.textFormMetadata.action === 'editing' ? 'Modifier' : 'Ajouter';
  }

  onSubmitSection() {
    if (this.titleForm.invalid) return;
    this.isLoading = true;
    this.api.post('story/section', { value: this.titleForm.value, textFormMetadata: this.textFormMetadata }).subscribe((data) => {
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
