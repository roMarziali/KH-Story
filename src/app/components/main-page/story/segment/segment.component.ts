import { Component, Input } from '@angular/core';
import { Segment } from 'src/app/models/segment';
import { ContentParametersService } from 'src/app/services/content-parameters.service';

@Component({
  selector: 'app-segment',
  templateUrl: './segment.component.html',
  styleUrls: ['./segment.component.scss']
})
export class SegmentComponent {

  @Input() segment: Segment = {
    id: 0,
    content: {
      type: '',
      order: '',
      texts: {}
    }
  };

  text: string = '';

  constructor(private contentParameters: ContentParametersService) {
    this.contentParameters.filtersChange.subscribe(() => {
      console.log("update setText");
      this.setText();
    });
  }

  ngOnInit() {
    this.setText();
  }

  ngOnDestroy() {
    this.contentParameters.filtersChange.unsubscribe();
  }

  setText() {
    const texts = this.segment.content.texts;
    for (const key in texts) {
      const text = texts[key].text;
      const relatedTo = texts[key].relatedTo;
      if (relatedTo.length === 0) continue;
      const isRelatedToFilteredGame = relatedTo.some(r => this.contentParameters.filters.find(f => f.id === r)?.selected);
      if (isRelatedToFilteredGame) {
        this.text = text;
        return;
      }
    }
    this.text = "";
  }

}
