const db = require('../connection');

const getMostLiked = () => {
  console.log('GET MOST LIKED CALLED !')
  return db.query(
    'SELECT * FROM vehicles JOIN users ON users.id = owner_id ORDER BY likes desc LIMIT 5;')
    .then(response => {
      return response.rows;
    });
};

module.exports = { getMostLiked };
