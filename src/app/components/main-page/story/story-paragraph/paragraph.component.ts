import { Component, Input } from '@angular/core';
import { ChapterSectionParagraph } from 'src/app/models/chapter-section-paragraph';
import { SettingsService } from 'src/app/services/settings.service';
import { ChangeDetectorRef } from '@angular/core';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.scss']
})
export class ParagraphComponent {

  @Input() paragraph!: ChapterSectionParagraph;

  private apiImage: string = environment.apiImage;


  constructor(private settingsService: SettingsService, private cdr: ChangeDetectorRef) {

  }

  get text(): string {
    return this.paragraph.text
  }



  get relatedImageSource(): string {
    if (!this.paragraph.image) return "";
    return `${this.apiImage}/${this.paragraph.image.game}/${this.paragraph.image.name}`.toLowerCase();
  }

}
