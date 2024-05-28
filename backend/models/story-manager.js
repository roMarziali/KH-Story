const fs = require('fs');
const path = require('path');
const shartp = require('sharp');

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

  static async addAnnotation(annotationContent) {
    const annotations = await this.getAnnotations();
    const idMax = annotations.reduce((acc, annotation) => annotation.id > acc ? annotation.id : acc, 0);
    annotations.push({
      id: idMax + 1,
      content: annotationContent
    })
    fs.writeFileSync(ANNOTATION_FILE_PATH, JSON.stringify(annotations));
    return { status: "ok" };
  }

  static async addSection(title, metaDataText) {
    const story = await this.getStory();
    const chapterId = metaDataText.chapterId;
    const chapter = story.find(chapter => chapter.id === chapterId);
    const newSectionOrder = getOrderForElement(chapter, "sections", metaDataText.previousSectionId);
    incrementOrderForElement(chapter, "sections", newSectionOrder);
    const id = getNextIdForElement(chapter.sections);
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
    const chapterId = metaDataText.chapterId;
    const sectionId = metaDataText.sectionId;
    const section = story.find(chapter => chapter.id === chapterId).sections.find(section => section.id === sectionId);
    this.deleteIncompleteImages(paragraph);
    paragraph.order = getOrderForElement(section, "paragraphs", metaDataText.previousParagraphId);
    incrementOrderForElement(section, "paragraphs", paragraph.order);
    paragraph.id = getNextIdForElement(section.paragraphs);
    section.paragraphs.push(paragraph);
    fs.writeFileSync(STORY_FILE_PATH, JSON.stringify(story));
  }

  static deleteIncompleteImages(paragraph) {
    if (paragraph.images) {
      for (const index in paragraph.images) {
        const image = paragraph.images[index];
        if (!this.areCompleteDataImage(image)){
          paragraph.images.splice(index, 1);
        }
      }
      if (!paragraph.images.length) delete paragraph.images;
    }
  }

  static areCompleteDataImage(image) {
    return (image.game && image.name && image.alt);
  }

  static async editParagraph(paragraph, chapterId, sectionId, paragraphId) {
    const story = await this.getStory();
    const section = story.find(chapter => chapter.id == chapterId).sections.find(section => section.id == sectionId);
    const indexParagraphToEdit = section.paragraphs.findIndex(paragraph => paragraph.id == paragraphId);
    section.paragraphs[indexParagraphToEdit].text = paragraph.text;
    this.deleteIncompleteImages(paragraph);
    if (paragraph.images){
      section.paragraphs[indexParagraphToEdit].images = paragraph.images;
    } else {
      delete section.paragraphs[indexParagraphToEdit].images;
    }
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
    const story = await this.getStory();
    const chapter = story.find(chapter => chapter.id == chapterId);
    const section = chapter.sections.find(section => section.id == sectionId);
    return section.paragraphs.find(paragraph => paragraph.id == paragraphId);
  }

  static async updateChaptersMetadata(chaptersMetadata) {
    const story = await this.getStory();
    for (let i = 0; i < story.length; i++) {
      const chapterId = story[i].id;
      const relatedChapterMetadata = chaptersMetadata.find(chapterMetadata => chapterMetadata.id === chapterId);
      if (!relatedChapterMetadata) {
        story.splice(i, 1);
        i--;
        continue;
      }
      story[i].title = relatedChapterMetadata.title;
      story[i].order = relatedChapterMetadata.order;
    }
    for (const chapterMetadata of chaptersMetadata) {
      const relatedChapter = story.find(chapter => chapter.id === chapterMetadata.id);
      const id = getNextIdForElement(story);
      if (!relatedChapter) {
        story.push({
          id,
          title: chapterMetadata.title,
          order: chapterMetadata.order,
          sections: []
        });
      }
    }
    story.sort((a, b) => a.order - b.order);
    fs.writeFileSync(STORY_FILE_PATH, JSON.stringify(story));
  }

  static addImage(image, gameId) {
    const allowedExtensions = ['png'];
    const mimeType = image.mimetype.split('/')[1];
    if (!allowedExtensions.includes(mimeType)) {
      throw new Error('Invalid file type');
    }
    const fileName = image.originalname + ".png";
    const gameFolder = gameId.toLowerCase();
    const imagePath = path.join(__dirname, `../public/images/original/${gameFolder}`);
    const imagePathResized = path.join(__dirname, `../public/images/resized/${gameFolder}`);
    if (!fs.existsSync(imagePath)) {
      fs.mkdirSync(imagePath);
    }
    if (!fs.existsSync(imagePathResized)) {
      fs.mkdirSync(imagePathResized);
    }
    fs.writeFileSync(path.join(imagePath, fileName), image.buffer);
    shartp(image.buffer).resize(500).toFile(path.join(imagePathResized, fileName));
  }

  static getListImages() {
    const images = [];
    const games = fs.readdirSync(path.join(__dirname, `../public/images/original`));
    for (const game of games) {
      if (game == ".gitkeep") continue;
      const gamePath = path.join(__dirname, `../public/images/original/${game}`);
      const gameImages = fs.readdirSync(gamePath);
      for (const gameImage of gameImages) {
        if (gameImage == ".gitkeep") continue;
        images.push({
          game: game,
          name: gameImage
        });
      }
    }
    return images;
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


function getNextIdForElement(parent) {
  //Find the next available id for an element
  let id = parent.length + 1;
  for (const element of parent) {
    if (element.id >= id) {
      id = element.id + 1;
    }
  }
  return id;
}


function getOrderForElement(parent, childName, previousElementId) {
  if (previousElementId == 0) return 1;
  return parent[childName].find(element => element.id === previousElementId).order + 1;
}

