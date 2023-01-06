const db = require('../connection');

const saveToDatabase = (make, model, yr, color, price, thumbnail_img, fullsize_img) => {
  // inserted into the vehicle table
  const query = `INSERT INTO vehicles (make, model, yr, color, price, thumbnail_img, fullsize_img) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
  return db.query(query, [make, model, yr, color, price, thumbnail_img, fullsize_img])
    .then(response => {
      console.log("Vehicle saved to database");
    })
    .catch(err => {
      console.log(err.message)
    })
};

module.exports = { saveToDatabase }