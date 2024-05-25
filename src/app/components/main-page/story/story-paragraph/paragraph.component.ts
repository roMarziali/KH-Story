import { Component, Input } from '@angular/core';
import { Story, Chapter, ChapterSection, Paragraph } from 'src/app/models/story';
import { SettingsService } from 'src/app/services/settings.service';
import { environment } from 'src/environments/environment';
import { StoryService } from 'src/app/services/story.service';
import { ZoomImageComponent } from './zoom-image/zoom-image.component';
import { MatDialog } from '@angular/material/dialog';

export interface subStrings {
  text: string;
  annotation?: string;
}

@Component({
  selector: 'app-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.scss']
})
export class ParagraphComponent {

  @Input() paragraph!: Paragraph;

  private apiImage: string = environment.apiImage;
  subStrings: subStrings[] = [];
  displayAnnotations: boolean = this.settingsService.displayAnnotations;

  constructor(private settingsService: SettingsService, private storyService: StoryService, private dialog: MatDialog) {
    this.settingsService.visibilityChange.subscribe(() => {
      this.displayAnnotations = this.settingsService.displayAnnotations;
    });
  }

  ngOnChanges() {
    this.setSubstrings();
  }

  setSubstrings() {
    this.subStrings = [];
    const regex = /\[annotation:(\d+)\](.*?)\[\/annotation\]/g;
    let match;
    let lastIndex = 0;
    const mainString = this.paragraph.text;

    while ((match = regex.exec(mainString)) !== null) {
      this.subStrings.push({ text: mainString.slice(lastIndex, match.index) });
      this.subStrings.push({ text: match[2], annotation: this.storyService.getAnnotation(parseInt(match[1])) });
      lastIndex = match.index + match[0].length;
    }
    this.subStrings.push({ text: mainString.slice(lastIndex) });
  }

  get resizedImageSource(): string {
    if (!this.paragraph.image) return "";
    return `${this.apiImage}/resized/${this.paragraph.image.game}/${this.paragraph.image.name}`.toLowerCase();
  }

  openZoomImage() {
    this.dialog.open(ZoomImageComponent, {
      data: { image: this.paragraph.image },
      panelClass: 'zoom-image-dialog',
    });
  }


}
