const db = require('../connection');

const getMostLiked = () => {
  return db.query(
    'SELECT * FROM vehicles JOIN users ON users.id = owner_id;')
    .then(response => {
      return response.rows;
    });
};

module.exports = { getMostLiked };
