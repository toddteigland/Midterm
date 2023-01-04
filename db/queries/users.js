const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const getRandomUser = () => {
  return db.query( 'SELECT * FROM users WHERE id = 1;')
  .then(data => {
    return data.rows[0];
  });
}



module.exports = { getUsers, getRandomUser };
