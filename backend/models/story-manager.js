const fs = require('fs');
const path = require('path');

const STORY_FILE_PATH = path.join(__dirname, '../data/story.json');
const ANNOTATION_FILE_PATH = path.join(__dirname, '../data/annotations.json');

module.exports = class StoryManager {

  static async getStory() {
    try {
      const data = fs.readFileSync(STORY_FILE_PATH, 'utf8');
      const jsonStory = JSON.parse(data);
      return jsonStory;
    } catch (err) {
      return [];
    }
  }

  static async getAnnotations() {
    const data = fs.readFileSync(ANNOTATION_FILE_PATH, 'utf8');
    const jsonAnnotation = JSON.parse(data);
    return jsonAnnotation;
  }

  static async addTitle(title, metaDataText) {
    const story = await this.getStory();
    const chapterId = metaDataText.chapterId;
    const previousTitle = metaDataText.previousTitle;
    const chapter = story.find(chapter => chapter.id === chapterId);
    incrementSectionsOrder(chapter, previousTitle + 1);
    const id = getNextIdForSection(chapter);
    chapter.sections.push({
      order: previousTitle + 1,
      title: title,
      id: id,
      paragraphs: []
    });

    fs.writeFileSync(STORY_FILE_PATH, JSON.stringify(story));
  }

  static async editTitle(title, metaDataText) {

  }
};

function incrementSectionsOrder(chapter, sectionOrder) {
  for (let i = 0; i < chapter.sections.length; i++) {
    if (chapter.sections[i].order >= sectionOrder) {
      chapter.sections[i].order++;
    }
  }
}

function getNextIdForSection(chapter) {
  let id = 1;
  let validId = false;
  while (!validId) {
    validId = true;
    for (let i = 0; i < chapter.sections.length; i++) {
      if (chapter.sections[i].id === id) {
        validId = false;
        id++;
      }
    }
  }
  return id;
}
