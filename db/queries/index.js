const db = require('../connection');

const getMostLiked = () => {
  return db.query(
    `SELECT count(likes.vehicle_id) as likes, vehicles.id as id, vehicles.thumbnail_img as thumbnail_img, users.email as email,
    vehicles.yr, vehicles.make, vehicles.model, vehicles.price
    FROM likes 
    JOIN vehicles ON likes.vehicle_id = vehicles.id
    JOIN users ON vehicles.owner_id = users.id
    GROUP BY likes.vehicle_id, vehicles.id, vehicles.thumbnail_img, users.email, vehicles.yr, vehicles.make
    , vehicles.model, vehicles.price
    ORDER BY likes DESC
    LIMIT 5;`)
    .then(response => {
      return response.rows;
    });
};

module.exports = { getMostLiked };
