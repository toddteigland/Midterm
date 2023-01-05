const saveToDatabase = (make, model, yr, price, color, thumbnail_img) => {
  // create an object to hold the form data
  const vehicleData = {
    owner_id: 1,
    make: make,
    model: model,
    yr: yr,
    price: price,
    color: color,
    thumbnail_img: thumbnail_img,
    fullsize_img: fullsize_img,
  };

  // inserted into the vehicle table
  const query = `INSERT INTO vehicles (make, model, yr, price, color, thumbnail_img) VALUES ('${vehicleData.make}', '${vehicleData.model}', '${vehicleData.yr}', '${vehicleData.price}', '${vehicleData.color}', '${vehicleData.thumbnail_img}')`;
  return db.query(query)
    .then(response => {
      console.log("Vehicle saved to database");
    });
};