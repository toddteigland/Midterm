const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const getVehicles = () => {
  return db.query('SELECT * FROM vehicles;')
    .then(data => {
      return data.rows;
    });
};




module.exports = { getUsers };
