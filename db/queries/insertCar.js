const db = require('../connection');

const saveToDatabase = (make, model, yr, price, color, thumbnail_img, fullsize_img) => {
  // create an object to hold the form data
  const vehicleData = {
    owner_id: 1,
    make: make,
    model: model,
    yr: yr,
    color: color,
    price: price,
    likes: 0, 
    thumbnail_img: thumbnail_img,
    fullsize_img: fullsize_img,
  };

  // inserted into the vehicle table
  const query = `INSERT INTO vehicles (owner_id, make, model, yr, color, price, likes, thumbnail_img, fullsize_img) VALUES ('${vehicleData.owner_id}', '${vehicleData.make}', '${vehicleData.model}', '${vehicleData.yr}', '${vehicleData.color}', '${vehicleData.price}', '${vehicleData.likes}', '${vehicleData.thumbnail_img}', '${vehicleData.fullsize_img}')`;
  return db.query(query)
    .then(response => {
      console.log("Vehicle saved to database");
    });
};

module.exports = { saveToDatabase }