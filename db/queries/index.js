const db = require('../connection');

const getMostLiked = () => {
  return db.query(
    'SELECT * FROM vehicles JOIN users ON users.id = owner_id ORDER BY likes DESC LIMIT 5;')
    .then(response => {
      return response.rows;
    });
};

module.exports = { getMostLiked };
