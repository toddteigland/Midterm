const db = require('../connection');

// Updates db sold collumn when vehicle marked as sold
const markedSold = (id) => {
  let query = db.query(`UPDATE vehicles SET sold = true WHERE id = ${id};`)
  .then(data => {
    return query;
  })
  .catch(err => {
    console.log(err.message)
  })
}

// When delete vehicle button clicked, removes from database
const deleteVehicle = (id) => {
  const query = `DELETE FROM vehicles WHERE id = $1`
  return db.query(query,[id])
  .then(response => {
  })
  .catch(err => {
    console.log(err.message)
  })
}
module.exports = { markedSold, deleteVehicle }