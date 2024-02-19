const fs = require('fs');
const path = require('path');

const INFORMATION_FILE_PATH = path.join(__dirname, '../data/information.json');

module.exports = class InformationManager {

  static async getInformation() {
    try {
      const data = fs.readFileSync(INFORMATION_FILE_PATH, 'utf8');
      const jsonStory = JSON.parse(data);
      return jsonStory;
    } catch (err) {
      return [];
    }
  }

  static async addInformation(information) {
    const data = await this.getInformation();
    const id = data.length > 0 ? data[data.length-1].id + 1 : 1;
    const date = new Date();
    information.date = date;
    information.id = id;
    data.push(information);
    fs.writeFileSync(INFORMATION_FILE_PATH, JSON.stringify(data));
  }

}
