const db = require('../connection');

const saveToDatabase = (make, model, yr, color, price, thumbnail_img, fullsize_img) => {
  // inserted into the vehicle table
  const query = `INSERT INTO vehicles (owner_id, make, model, yr, color, price, thumbnail_img, fullsize_img) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
  return db.query(query, [1, make, model, yr, color, price, thumbnail_img, fullsize_img])
    .then(response => {
      console.log("Vehicle saved to database");
    })
    .catch(err => {
      console.log(err.message)
    })
};

const addFirstLike = (user_id, vehicle_id) => {
  const query = `INSERT INTO likes (user_id, vehicle_id)
  VALUES($1,$2)`
  return db.query(query, [1,11])
    .then(response => {
      console.log('FIRST LIKE ADDED!');
    })
    .catch(err => {
      console.log(err.message)
    })
};

module.exports = { saveToDatabase, addFirstLike }