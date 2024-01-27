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

  static async addSection(title, metaDataText) {
    const story = await this.getStory();
    const chapterId = metaDataText.chapterId;
    const chapter = story.find(chapter => chapter.id === chapterId);
    const newSectionOrder = getNewSectionOrder(chapter, metaDataText.previousSectionId);
    incrementSectionsOrder(chapter, newSectionOrder);
    const id = getNextIdForSection(chapter);
    chapter.sections.push({
      order: newSectionOrder,
      title: title,
      id: id,
      paragraphs: []
    });

    fs.writeFileSync(STORY_FILE_PATH, JSON.stringify(story));
  }

  static async editSection(title, chapterId, sectionId) {
    chapterId = Number(chapterId);
    sectionId = Number(sectionId);
    const story = await this.getStory();
    const chapter = story.find(chapter => chapter.id === chapterId);
    const section = chapter.sections.find(section => section.id === sectionId);
    section.title = title;
    fs.writeFileSync(STORY_FILE_PATH, JSON.stringify(story));
  }

  static async deleteSection(chapterId, sectionId) {
    chapterId = Number(chapterId);
    sectionId = Number(sectionId);
    const story = await this.getStory();
    const chapter = story.find(chapter => chapter.id === chapterId);
    const section = chapter.sections.find(section => section.id === sectionId);
    const sectionOrder = section.order;
    chapter.sections = chapter.sections.filter(section => section.id !== sectionId);
    decrementSectionsOrder(chapter, sectionOrder);
    fs.writeFileSync(STORY_FILE_PATH, JSON.stringify(story));
  }
};

function incrementSectionsOrder(chapter, incrementFromThisOrderNumber) {
  //Add 1 to the order of all sections with order >= incrementFromThisOrderNumber
  for (let i = 0; i < chapter.sections.length; i++) {
    if (chapter.sections[i].order >= incrementFromThisOrderNumber) {
      chapter.sections[i].order++;
    }
  }
}

function decrementSectionsOrder(chapter, decrementFromThisOrderNumber) {
  //Remove 1 to the order of all sections with order > decrementFromThisOrderNumber
  for (let i = 0; i < chapter.sections.length; i++) {
    if (chapter.sections[i].order > decrementFromThisOrderNumber) {
      chapter.sections[i].order--;
    }
  }
}

function getNextIdForSection(chapter) {
  //Find the next available id for a section
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

function getNewSectionOrder(chapter, previousSectionId) {
  if (previousSectionId === 0) return 1;
  const previousSection = chapter.sections.find(section => section.id === previousSectionId);
  const previousSectionOrder = previousSection.order;
  if (previousSectionOrder) return previousSectionOrder + 1;
  return 1;
}
