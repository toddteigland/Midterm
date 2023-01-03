const express = require('express');
const router  = express.Router();
const { userCars } = require('../db/queries/userCars');

router.get('/', (req, res) => {
  userCars()
    .then( myCars  => {
      res.json({ myCars });
    })
    .catch(err => {
      res
        .status(500)
        .json({error: err.message})
    });
});

module.exports = router;