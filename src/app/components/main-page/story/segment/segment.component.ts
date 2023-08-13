import { Component, Input } from '@angular/core';
import { Segment } from 'src/app/models/segment';

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

}
