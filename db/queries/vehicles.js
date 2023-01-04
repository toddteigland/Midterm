const { query } = require('express');
const db = require('../connection');

const filterVehicles = (options) => {
  const queryParams = [];
  queryString = `
  SELECT *
  FROM vehicles
  JOIN users ON users.id = owner_id
  `;
  if (options.make) {
    queryParams.push(options.make);
    queryString += `WHERE make = $${queryParams.length}`;
  };
  if (options.model) {
    queryParams.push(options.model);
    if (queryParams.length === 1) {
      queryString += ` WHERE model = $${queryParams.length}`;
    } else {
      queryString += ` AND model = $${queryParams.length}`;
    }
  };
  if (options.minPrice) {
    queryParams.push(options.minPrice);
    if (queryParams.length === 1) {
      queryString += ` WHERE price >= $${queryParams.length}`;
    } else {
      queryString += ` AND price >= $${queryParams.length}`;
    }
  };
  if (options.maxPrice) {
    queryParams.push(options.maxPrice);
    if (queryParams.length === 1) {
      queryString += ` WHERE price <= $${queryParams.length}`;
    } else {
      queryString += ` AND price <= $${queryParams.length}`;
    }
  };
  if (options.minYr) {
    queryParams.push(options.minYr);
    if (queryParams.length === 1) {
      queryString += ` WHERE yr >= $${queryParams.length}`;
    } else {
      queryString += ` AND yr >= $${queryParams.length}`;
    }
  };
  if (options.maxYr) {
    queryParams.push(options.maxYr);
    if (queryParams.length === 1) {
      queryString += ` WHERE yr <= $${queryParams.length}`;
    } else {
      queryString += ` AND yr <= $${queryParams.length}`;
    }
  };
  if (options.sort === 'price-asc') {
    queryString += ` ORDER BY price ASC`;
  } else if (options.sort === 'price-desc') {
    queryString += ` ORDER BY price DESC`;
  } else if (options.sort === 'year-asc') {
    queryString += ` ORDER BY yr ASC`;
  } else if (options.sort === 'year-desc') {
    queryString += ` ORDER BY yr DESC`;
  } else if (options.sort === 'likes') {
    queryString += ` ORDER BY likes DESC`;
  }

  queryString += `
  LIMIT 10;
  `;

  return db.query(queryString, queryParams)
    .then((response) => {
      return response.rows;
    });
};


const addLikes = (users_id) => {
  queryParams = [];
  queryString = ` 
  INSERT INTO likes (user_id, vehicle_id)
  JOIN users ON users.id = owner_id
  JOIN likes ON owner_id = likes.user_id
  WHERE users.id = $1
  VALUES ($1, $2) ;`, [users.id,vehicle_id ];

  return db.query(queryString, queryParams)
    .then((response) => {
      return response.rows;
    });
};


module.exports = {
  filterVehicles,
  addLikes
}

