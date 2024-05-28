const fs = require('fs');

const storyFile = fs.readFileSync('./data/story.json', 'utf8');
const story = JSON.parse(storyFile);

for (const chapter of story) {
  for (const section of chapter.sections) {
    for (const paragraph of section.paragraphs) {
      if (paragraph.image){
        paragraph.images = [paragraph.image];
        delete paragraph.image;
      }
    }
  }
}

fs.writeFileSync('./data/story.json', JSON.stringify(story));
