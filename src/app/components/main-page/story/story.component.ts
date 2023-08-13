import { Component } from '@angular/core';
import { Segment } from 'src/app/models/segment';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent {

  segments: Segment[] = [];

  ngOnInit() {
    const api = 'http://localhost:3000/api/story/getSegments';
    fetch(api)
      .then(response => response.json())
      .then(data => this.segments = data);
  }

}
