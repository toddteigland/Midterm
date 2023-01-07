const express = require('express');
const router  = express.Router();
const { saveToDatabase, addFirstLike } = require('../db/queries/insertCar')
const { markedSold, deleteVehicle } = require('../db/queries/markAsSold');

//FUNCTIONALITY FOR DASHBOARD FORMS AND BUTTONS

// Form post for creating new vehicle on dashboard
router.post('/', async(req, res) => {
  saveToDatabase(req.body.make, req.body.model, req.body.yr, req.body.color, req.body.price, req.body.thumbnail_img, req.body.fullsize_img)
  .then(() => {
    addFirstLike(1, 11);
    res.json({ status: "success" })
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message})
  });
})

router.post('/:id', async(req, res) => {
  markedSold(req.params.id)
})

router.post('/delete/:id', async(req, res) => {
  deleteVehicle(req.params.id)
  res.redirect('/dashboard');
})

module.exports = router;