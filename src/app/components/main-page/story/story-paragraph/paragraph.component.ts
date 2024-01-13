import { Component, Input } from '@angular/core';
import { ChapterSectionParagraph } from 'src/app/models/chapter-section-paragraph';
import { SettingsService } from 'src/app/services/settings.service';
import { environment } from 'src/environments/environment';
import { StoryService } from 'src/app/services/story.service';

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

  @Input() paragraph!: ChapterSectionParagraph;

  private apiImage: string = environment.apiImage;
  subStrings: subStrings[] = [];
  displayAnnotations: boolean = this.settingsService.isFilterSelected("annotations");
  darkMode: boolean = this.settingsService.settings.visibility.darkMode;

  constructor(private settingsService: SettingsService, private storyService: StoryService) {
    this.settingsService.filtersChange.subscribe(() => {
      this.displayAnnotations = this.settingsService.isFilterSelected("annotations");
    });
    this.settingsService.visibilityChange.subscribe(() => {
      this.darkMode = this.settingsService.settings.visibility.darkMode;
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



  get relatedImageSource(): string {
    if (!this.paragraph.image) return "";
    return `${this.apiImage}/${this.paragraph.image.game}/${this.paragraph.image.name}`.toLowerCase();
  }

}
