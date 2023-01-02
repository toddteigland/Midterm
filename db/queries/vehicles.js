const { query } = require('express');
const db = require('../connection');

const filterVehicles = (options) => {
  console.log('QUERY PARAMS: ', queryParams);
  const queryParams = [];
  queryString = `
  SELECT *
  FROM vehicles
  `;
  if (options.make) {
    queryParams.push(options.make);
    queryString += `WHERE make = $${queryParams.length}`;
  };

  // if (options.model) {
  //   queryParams.push(options.model);
  //   queryString += ` WHERE model = $${queryParams.length}`;
  // };
  // if (options.price) {
  //   queryParams.push(options.price);
  //   if (queryParams.length === 1) {
  //     queryString += ` WHERE price >= $${queryParams.length}`;
  //   } else {
  //   queryString += ` AND price >= $${queryParams.length}`;
  //   }
  // };
  // if (options.price) {
  //   queryParams.push(options.price);
  //   if (queryParams.length === 1) {
  //   queryString += ` WHERE price <= $${queryParams.length}`;
  //   } else {
  //   queryString += ` AND price <= $${queryParams.length}`;
  //   }
  // };
  // if (options.yr) {
  //   queryParams.push(options.yr);
  //   if (queryParams.length === 1) {
  //     queryString += ` WHERE yr >= $${queryParams.length}`;
  //   } else {
  //   queryString += ` AND yr >= $${queryParams.length}`;
  //   }
  // };
  // if (options.yr) {
  //   queryParams.push(options.yr);
  //   if (queryParams.length === 1) {
  //     queryString += ` WHERE yr <= $${queryParams.length}`;
  //   } else {
  //     queryString += ` AND yr <= $${queryParams.length}`;
  //   }
  // };

  queryString += `
  ORDER BY likes desc
  LIMIT 10;
  `;

 console.log('QUERY STRING FROM filterVehicles FUNCTION: ', queryString)

  return db.query(queryString, queryParams)
  .then((response) => {
    return response.rows
  });
};

module.exports = {
  filterVehicles,
}

