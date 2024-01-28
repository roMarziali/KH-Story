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
    const newSectionOrder = getOrderForElement(chapter, "sections", metaDataText.previousSectionId);
    incrementOrderForElement(chapter, "sections", newSectionOrder);
    const id = getNextIdForElement(chapter, "sections");
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
    decrementOrderForElement(chapter, "sections", sectionOrder);
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
    const paragraphOrder = getOrderForElement(section, "paragraphs", metaDataText.previousParagraphId);
    incrementOrderForElement(section, "paragraphs", paragraphOrder);
    const paragraphId = getNextIdForElement(section, "paragraphs");
    section.paragraphs.push({
      order: paragraphOrder,
      id: paragraphId,
      texts: paragraph.texts
    });
    fs.writeFileSync(STORY_FILE_PATH, JSON.stringify(story));
  }

  static async editParagraph(paragraph, chapterId, sectionId, paragraphId) {
    for (const text of paragraph.texts) {
      if (!text.image || !text.image.game || !text.image.alt || !text.image.name) delete text.image;
    }
    const story = await this.getStory();
    const section = story.find(chapter => chapter.id == chapterId).sections.find(section => section.id == sectionId);
    const indexParagraphToEdit = section.paragraphs.findIndex(paragraph => paragraph.id == paragraphId);
    section.paragraphs[indexParagraphToEdit].texts = paragraph.texts;
    fs.writeFileSync(STORY_FILE_PATH, JSON.stringify(story));
  }

  static async deleteParagraph(chapterId, sectionId, paragraphId) {
    chapterId = Number(chapterId);
    sectionId = Number(sectionId);
    paragraphId = Number(paragraphId);
    const story = await this.getStory();
    const chapter = story.find(chapter => chapter.id === chapterId);
    const section = chapter.sections.find(section => section.id === sectionId);
    const paragraph = section.paragraphs.find(paragraph => paragraph.id === paragraphId);
    const paragraphOrder = paragraph.order;
    section.paragraphs = section.paragraphs.filter(paragraph => paragraph.id !== paragraphId);
    decrementOrderForElement(section, "paragraphs", paragraphOrder);
    fs.writeFileSync(STORY_FILE_PATH, JSON.stringify(story));
  }

  static async getParagraph(chapterId, sectionId, paragraphId) {
    chapterId = Number(chapterId);
    sectionId = Number(sectionId);
    paragraphId = Number(paragraphId);
    const story = await this.getStory();
    const chapter = story.find(chapter => chapter.id === chapterId);
    const section = chapter.sections.find(section => section.id === sectionId);
    const paragraph = section.paragraphs.find(paragraph => paragraph.id === paragraphId);
    return paragraph;
  }
};

function incrementOrderForElement(parent, childName, incrementFromThisOrderNumber) {
  //Add 1 to the order of all elements with order >= incrementFromThisOrderNumber
  for (let i = 0; i < parent[childName].length; i++) {
    if (parent[childName][i].order >= incrementFromThisOrderNumber) {
      parent[childName][i].order++;
    }
  }
}

function decrementOrderForElement(parent, childName, decrementFromThisOrderNumber) {
  //Remove 1 to the order of all elements with order > decrementFromThisOrderNumber
  for (let i = 0; i < parent[childName].length; i++) {
    if (parent[childName][i].order > decrementFromThisOrderNumber) {
      parent[childName][i].order--;
    }
  }
}


function getNextIdForElement(parent, childName) {
  //Find the next available id for an element
  let id = 1;
  let validId = false;
  while (!validId) {
    validId = true;
    for (let i = 0; i < parent[childName].length; i++) {
      if (parent[childName][i].id === id) {
        validId = false;
        id++;
      }
    }
  }
  return id;
}


function getOrderForElement(parent, childName, previousElementId) {
  if (previousElementId == 0) return 1;
  return parent[childName].find(element => element.id === previousElementId).order + 1;
}

function addOrderToTextsFromParagraph(paragraph) {
  let i = 1;
  paragraph.texts.forEach(element => {
    element.order = i;
    i++;
  });
}

