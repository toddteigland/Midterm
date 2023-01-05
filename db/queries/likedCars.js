const db = require('../connection');

const userLikes = () => {
  return db.query(
    'SELECT * FROM vehicles JOIN likes ON vehicles.id = likes.vehicle_id WHERE likes.user_id = 1')
    .then(data => {
      console.log("data", data)
      return data.rows;
  });
};

module.exports = {
  userLikes
}