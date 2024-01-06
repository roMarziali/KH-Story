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
      console.log(data);
      this.segments = data
    });
  }

}
