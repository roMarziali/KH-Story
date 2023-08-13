const pgRequest = require('./pgRequest');

module.exports = class SegmentManager {

  static getSegments() {
    const query = `SELECT * FROM segments ORDER BY (segment->>'order')::integer;`;
    return pgRequest.query(query);
  }
};
