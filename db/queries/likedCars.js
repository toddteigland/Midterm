const db = require('../connection');

const userLikes = () => {
  return db.query(
    'SELECT * FROM vehicles WHERE id IN (SELECT vehicle_id FROM likes WHERE user_id = ?)')
    .then(data => {
      return data.rows;
  });
};

module.exports = {
  userLikes
}