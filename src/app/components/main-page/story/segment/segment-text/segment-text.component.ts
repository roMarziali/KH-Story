import { Component, Input } from '@angular/core';
import { AnnotationsService } from 'src/app/services/annotations.service';
import { ContentParametersService } from 'src/app/services/content-parameters.service';

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

  constructor(private annotations: AnnotationsService, private contentParameters: ContentParametersService) {
    this.contentParameters.filtersChange.subscribe(() => {
      this.displayAnnotations = (this.contentParameters.filters.find(f => f.id === 'annotations')?.selected) ? true : false;
    });
  }

  ngOnInit() {
    this.displayAnnotations = (this.contentParameters.filters.find(f => f.id === 'annotations')?.selected) ? true : false;

    const regex = /\[annotation:(\d+)\](.*?)\[\/annotation\]/g;
    let match;
    let lastIndex = 0;

    while ((match = regex.exec(this.mainString)) !== null) {
      this.strings.push({ text: this.mainString.slice(lastIndex, match.index) });
      this.strings.push({ text: match[2], annotation: this.annotations.getAnnotation(parseInt(match[1])) });
      lastIndex = match.index + match[0].length;
    }
    this.strings.push({ text: this.mainString.slice(lastIndex) });
  }

}
