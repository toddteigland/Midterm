const express = require('express');
const router  = express.Router();
const { userLikes } = require('../db/queries/likedCars');
const { userCars } = require('../db/queries/userCars');
const { saveToDatabase, addFirstLike } = require('../db/queries/insertCar')
const app = express()
const bodyParser = require('body-parser');
const { response } = require('express');
const { markedSold, deleteVehicle } = require('../db/queries/markAsSold');

app.use('/api/userLikes', userLikes)
app.use('/api/userCars', userCars)
app.use('/api/insertCar', saveToDatabase)
app.use(bodyParser.json())

router.get('/', async(req, res) => {
  const likedCars = await userLikes();
  const ownerCars = await userCars();
  res.render('dashboard', { likedCars, ownerCars, userEmail: req.cookies.userEmail});
}); 

// router.post('/api/cars/:id', async(req, res) => {
//   console.log("MarkSold", req.params.id)
//   markedSold(req.params.id)
// })



router.post('/api/cars', async(req, res) => {
  saveToDatabase(req.body.make, req.body.model, req.body.yr, req.body.color, req.body.price, req.body.thumbnail_img, req.body.fullsize_img)
  .then(() => {
    addFirstLike(1, 11);
    res.json({ status: "success" })
  });
    // .then(() => {
    //   res.json({ status: 'Success'})
    // });
})




module.exports = router;