const db = require('../connection');

const userCars = () => {
  return db.query(
    'SELECT * FROM vehicles WHERE owner_id = ?')
      .then(data => {
        return data.rows;
    });
};

module.exports = { 
  userCars
}