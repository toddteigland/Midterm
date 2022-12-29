const db = require('../connection');

// Homepage - most liked cars
const getMostLiked = () => {
  return db.query('SELECT * FROM vehicles ORDER BY likes DESC LIMIT 5;')
    .then(data => {
      return data.rows;
    });
};

// Search results page
const getSearchResults = () => {
  return db.query()
    .then(data => {
      return data.rows;
    });
}

