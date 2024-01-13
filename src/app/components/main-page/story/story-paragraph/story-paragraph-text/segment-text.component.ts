import { Component, Input, SimpleChanges } from '@angular/core';
import { StoryService } from 'src/app/services/story.service';
import { SettingsService } from 'src/app/services/settings.service';

export interface Strings {
  text: string;
  annotation?: string;
}

@Component({
  selector: 'app-segment-text',
  templateUrl: './segment-text.component.html',
  styleUrl: './segment-text.component.scss'
})
export class SegmentTextComponent {

  @Input() mainString!: string;
  strings: Strings[] = [];
  displayAnnotations!: boolean;
  darkMode!: boolean;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['mainString']) {
      this.setStrings();
    }
  }

  constructor(private stodyService: StoryService, private settingsService: SettingsService) {
    this.settingsService.filtersChange.subscribe(() => {
      this.displayAnnotations = this.settingsService.isFilterSelected("annotations");
    });
    this.darkMode = this.settingsService.isDarkMode();
    this.settingsService.visibilityChange.subscribe(() => {
      this.darkMode = this.settingsService.isDarkMode();
    });
  }

  ngOnInit() {
    this.displayAnnotations = this.settingsService.isFilterSelected("annotations");
    this.setStrings();
  }

  setStrings() {
    this.strings = [];
    const regex = /\[annotation:(\d+)\](.*?)\[\/annotation\]/g;
    let match;
    let lastIndex = 0;

    while ((match = regex.exec(this.mainString)) !== null) {
      this.strings.push({ text: this.mainString.slice(lastIndex, match.index) });
      this.strings.push({ text: match[2], annotation: this.stodyService.getAnnotation(parseInt(match[1])) });
      lastIndex = match.index + match[0].length;
    }
    this.strings.push({ text: this.mainString.slice(lastIndex) });
  }

}
