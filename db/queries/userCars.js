const db = require('../connection');

// Shows vehicles owned by a particular owner on dashboard page
const userCars = () => {
  return db.query(
    'SELECT * FROM vehicles WHERE owner_id = 1')
      .then(data => {
        return data.rows;
    });
};

module.exports = { 
  userCars
}