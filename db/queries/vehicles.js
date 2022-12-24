const db = require('../connection');


const getVehicles = function(options) {

  const queryParams = [];

  queryString = `
  SELECT *
  FROM vehicles
  `;

  console.log('OPTIONS:  ', options);
  if (options) {
    queryParams.push(options);
    queryString += `WHERE make = $${queryParams.length}`;
    console.log('I MADE IT TO OPTIONS.MAKE!!');
  };

  if (options.model) {
    queryParams.push(`%${options.model}%`);
    queryString += ` WHERE model = $${queryParams.length}`;
  };
  if (options.price) {
    queryParams.push(options.price);
    if (queryParams.length === 1) {
      queryString += ` WHERE price >= $${queryParams.length}`;
    } else {
    queryString += ` AND price >= $${queryParams.length}`;
    }
  };
  if (options.price) {
    queryParams.push(options.price);
    if (queryParams.length === 1) {
    queryString += ` WHERE price <= $${queryParams.length}`;
    } else {
    queryString += ` AND price <= $${queryParams.length}`;
    }
  };
  if (options.yr) {
    queryParams.push(options.yr);
    if (queryParams.length === 1) {
      queryString += ` WHERE yr >= $${queryParams.length}`;
    } else {
    queryString += ` AND yr >= $${queryParams.length}`;
    }
  };
  if (options.yr) {
    queryParams.push(options.yr);
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

  return db.query(queryString, queryParams)
  .then((response) => {
    console.log('RESPONSE.ROWS: ', response.rows)
    return response.rows
  });
};

module.exports = {
  getVehicles
}

