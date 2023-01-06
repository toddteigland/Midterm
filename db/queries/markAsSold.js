const db = require('../connection');

const markedSold = (id) => {
  console.log('line 4 markAs sold:')
  let query = db.query(`UPDATE vehicles SET sold = true WHERE id = ${id};`)
  .then(data => {
    console.log("data line 7", data)
    return query;
  })
}


module.exports = { markedSold }