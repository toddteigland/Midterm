const express = require('express');
const router  = express.Router();

const searchQueries = ('../db/queries/insertCar')


router.get('/', (req, res) => {
  searchQueries.saveToDatabase(req.query)
  .then(data => {
    res.json({data});
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message})
  })
})

module.exports = router;