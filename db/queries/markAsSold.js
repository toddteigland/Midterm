const db = require('../connection');

const markedSold = (id) => {
  let query = db.query(`UPDATE vehicles SET sold = true WHERE id = ${id};`)
  .then(data => {
    console.log("markedSold data", data.rows)
    return query;
  })
  .catch(err => {
    console.log(err.message)
  })
}

const deleteVehicle = (id) => {
  const query = `DELETE FROM vehicles WHERE id = $1`
  return db.query(query,[id])
  .then(response => {
    console.log('DELETE VEHICLE RESPONSE: ', response.rows);
  })
  .catch(err => {
    console.log(err.message)
  })
}
module.exports = { markedSold, deleteVehicle }