const fs = require('fs');
const path = require('path');

const SEGMENT_FILE_PATH = path.join(__dirname, '../data/segments.json');

module.exports = class SegmentManager {

  static async getSegments() {
    const data = fs.readFileSync(SEGMENT_FILE_PATH, 'utf8');
    const jsonSegment = JSON.parse(data);
    return jsonSegment;

  }
};
