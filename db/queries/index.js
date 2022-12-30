const db = require('../connection');

const getMostLiked = () => {
  return db.query(
    'SELECT * FROM vehicles ORDER BY likes DESC LIMIT 5;')
    .then(response => {
      return response.rows;
    });
};

module.exports = { getMostLiked };
