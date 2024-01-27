import { Component, Inject } from '@angular/core';
import { TextFormMetadata } from 'src/app/models/text-form-identifier';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-story-section-form',
  templateUrl: './story-section-form.component.html',
  styleUrl: './story-section-form.component.scss'
})
export class StorySectionFormComponent {

  isLoading: boolean = false;
  textFormMetadata!: TextFormMetadata;
  action!: "adding" | "editing";


  constructor(@Inject(MAT_DIALOG_DATA) public data: { textFormMetadata: TextFormMetadata, action: "adding" | "editing", title?: string }, private api: ApiService, public dialogRef: MatDialogRef<any>) {
    this.textFormMetadata = data.textFormMetadata;
    this.action = data.action;
    if (data.title) this.titleForm.controls.title.setValue(data.title);
  }

  titleForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  onSubmitSection() {
    if (this.titleForm.invalid) return;
    this.isLoading = true;
    if (this.action == "adding") {
      this.api.post('story/section', { title: this.titleForm.value.title, textFormMetadata: this.textFormMetadata }).subscribe((data) => {
        if (data.status == "ok") {
          this.isLoading = false;
          this.dialogRef.close({ modified: true });
        }
      });
    } else if (this.action == "editing") {
      this.api.put(`story/section/${this.textFormMetadata.chapterId}/${this.textFormMetadata.sectionId}`, { title: this.titleForm.value.title }).subscribe((data) => {
        if (data.status == "ok") {
          this.isLoading = false;
          this.dialogRef.close({ modified: true });
        }
      });
    }


  }


}
