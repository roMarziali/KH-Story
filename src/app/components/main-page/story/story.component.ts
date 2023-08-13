import { Component } from '@angular/core';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent {

  ngOnInit() {
    const api = 'http://localhost:3000/api/story/getSegments';
    fetch(api)
      .then(response => response.json())
      .then(data => console.log(data));


  }

}
