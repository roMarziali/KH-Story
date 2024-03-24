const fs = require('fs');

const storyFile = fs.readFileSync('./data/story.json', 'utf8');
const story = JSON.parse(storyFile);

for (const chapter of story) {
  for (const section of chapter.sections) {
    for (const paragraph of section.paragraphs) {
      for (const text of paragraph.texts) {
        const newRelatedTo = { 1: text.relatedTo, 2: [] };
        text.relatedTo = newRelatedTo;
      }
    }
  }
}

fs.writeFileSync('./data/story.json', JSON.stringify(story));
