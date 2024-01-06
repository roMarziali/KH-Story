import { Component } from '@angular/core';
import { Segment } from 'src/app/models/segment';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent {

  segments: Segment[] = [];

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.get('story/segments').subscribe((data) => {
      this.segments = data
      this.sortSegments();
    });
  }

  sortSegments() {
    this.segments.sort((a, b) => {
      if (a.order === null) return 1;
      if (b.order === null) return -1;
      return a.order - b.order;
    });
  }

}
