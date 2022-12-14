import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-story-content',
  templateUrl: './story-content.component.html',
  styleUrls: ['./story-content.component.scss']
})
export class StoryContentComponent {

  storySegments: any = [];
  @Input() storedSourcesFilter: Number[] = [];
  @Input() storedDisplayAnnotation: boolean = true;

  constructor() {
    this.storySegments = this.getStorySegments()
  }

  displayMethod(storySegment: any) {
    for (const source of storySegment.sources) {
      if (this.storedSourcesFilter.includes(source)) return { display: true, content: storySegment.content };
    }
    if (storySegment.alternatives) {
      for (const alternativeId in storySegment.alternatives) {
        const alternative = storySegment.alternatives[alternativeId];
        for (const source of alternative.sources) {
          if (this.storedSourcesFilter.includes(source)) return { display: true, content: alternative.content };
        }
      }
    }
    return { display: false };
  }

  getStorySegments(): object[] {
    return [
      {
        "order": 1,
        "content": "Ère des Contes de Fées",
        "class": "h1",
        "sources": [0, 8],
      },

      {
        "order": 2,
        "content": "Les Îles du Destin",
        "class": "h2",
        "sources": [1]
      },

      {
        "order": 3,
        "content": "Rencontre avec un inconnu",
        "class": "h3",
        "sources": [2, 3, 6]
      },
      {
        "order": 4,
        "content": "Ceci est l'histoire de Sora",
        "class": "body",
        "sources": [2, 4, 5],
        "alternatives": {
          1: {
            "content": "Ceci est l'histoire d'un garçon armé d'une clé géante",
            "sources": [7, 8]
          },
          2: {
            "content": "Ceci est l'histoire de Nomura",
            "sources": [9, 10]
          }
        },
        "annotation": {
          "content": "Ceci est une annotation !"
        }
      }
    ]
  }

}
