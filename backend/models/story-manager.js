const fs = require('fs');
const path = require('path');

const STORY_FILE_PATH = path.join(__dirname, '../data/story.json');
const ANNOTATION_FILE_PATH = path.join(__dirname, '../data/annotations.json');

module.exports = class SegmentManager {

  static async getStory() {
    const data = fs.readFileSync(STORY_FILE_PATH, 'utf8');
    const jsonSegment = JSON.parse(data);
    return jsonSegment;
  }

  static async getAnnotations() {
    const data = fs.readFileSync(ANNOTATION_FILE_PATH, 'utf8');
    const jsonAnnotation = JSON.parse(data);
    return jsonAnnotation;
  }
};
