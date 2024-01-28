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
    const newSectionOrder = getOrderFromSectionId(chapter, metaDataText.previousSectionId) + 1;
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

  static async addParagraph(paragraph, metaDataText) {
    const story = await this.getStory();
    for (const text of paragraph.texts) {
      if (!text.image || !text.image.game || !text.image.alt || !text.image.name) delete text.image;
    }
    addOrderToTextsFromParagraph(paragraph);
    const chapterId = metaDataText.chapterId;
    const sectionId = metaDataText.sectionId;
    const section = story.find(chapter => chapter.id === chapterId).sections.find(section => section.id === sectionId);
    const paragraphOrder = getOrderFromParagraphId(section, metaDataText.previousParagraphId) + 1;
    incrementParagraphsOrder(section, paragraphOrder);
    const paragraphId = getNextIdForParagraph(section);
    section.paragraphs.push({
      order: paragraphOrder,
      id: paragraphId,
      texts: paragraph.texts
    });
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

function incrementParagraphsOrder(section, incrementFromThisOrderNumber) {
  //Add 1 to the order of all paragraphs with order >= incrementFromThisOrderNumber
  for (let i = 0; i < section.paragraphs.length; i++) {
    if (section.paragraphs[i].order >= incrementFromThisOrderNumber) {
      section.paragraphs[i].order++;
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

function getNextIdForParagraph(section) {
  //Find the next available id for a paragraph
  let id = 1;
  let validId = false;
  while (!validId) {
    validId = true;
    for (let i = 0; i < section.paragraphs.length; i++) {
      if (section.paragraphs[i].id === id) {
        validId = false;
        id++;
      }
    }
  }
  return id;
}

function addOrderToTextsFromParagraph(paragraph) {
  let i = 1;
  paragraph.texts.forEach(element => {
    element.order = i;
    i++;
  });
}

function getOrderFromSectionId(chapter, sectionId) {
  if (sectionId == 0) return 0;
  return chapter.sections.find(section => section.id === sectionId).order;
}

function getOrderFromParagraphId(section, paragraphId) {
  if (paragraphId == 0) return 0;
  return section.paragraphs.find(paragraph => paragraph.id === paragraphId).order;
}
