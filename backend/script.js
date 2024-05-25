const fs = require('fs');

const storyFile = fs.readFileSync('./data/story.json', 'utf8');
const story = JSON.parse(storyFile);

for (const chapter of story) {
  for (const section of chapter.sections) {
    for (const paragraph of section.paragraphs) {
      const texts = paragraph.texts;
      const firstText = texts[0].text;
      paragraph.text = firstText;
      if (texts[0].image){
        paragraph.image = texts[0].image;
      }
      delete paragraph.texts;
    }
  }
}

fs.writeFileSync('./data/story.json', JSON.stringify(story));
