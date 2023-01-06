const db = require('../connection');


const getVehicles = function() {

  const queryParams = [];

  queryString = `
  SELECT *
  FROM vehicles
  `;

  if ('search-vehicle-make') {
    queryParams.push('search-vehicle-make');
    queryString += `WHERE make = $${queryParams.length}`;
  };

  if ('search-vehicle-model') {
    queryParams.push('search-vehicle-model');
    queryString += ` WHERE model = $${queryParams.length}`;
  };
  if ('search-vehicle-min-price') {
    queryParams.push('search-vehicle-min-price');
    if (queryParams.length === 1) {
      queryString += ` WHERE price >= $${queryParams.length}`;
    } else {
    queryString += ` AND price >= $${queryParams.length}`;
    }
  };
  if ('search-vehicle-max-price') {
    queryParams.push('search-vehicle-max-price');
    if (queryParams.length === 1) {
    queryString += ` WHERE price <= $${queryParams.length}`;
    } else {
    queryString += ` AND price <= $${queryParams.length}`;
    }
  };
  if ('search-vehicle-min-year') {
    queryParams.push('search-vehicle-min-year');
    if (queryParams.length === 1) {
      queryString += ` WHERE yr >= $${queryParams.length}`;
    } else {
    queryString += ` AND yr >= $${queryParams.length}`;
    }
  };
  if ('search-vehicle-max-year') {
    queryParams.push('search-vehicle-max-year');
    if (queryParams.length === 1) {
      queryString += ` WHERE yr <= $${queryParams.length}`;
    } else {
      queryString += ` AND yr <= $${queryParams.length}`;
    }
  };

  queryString += `
  ORDER BY likes desc
  LIMIT 10;
  `;

 console.log('QUERY STRING: ', queryString)
 console.log('QUERY PARAMS: ', queryParams)

  return db.query(queryString, queryParams)
  .then((response) => {
    return response.rows
  });
};

module.exports = {
  getVehicles
}

