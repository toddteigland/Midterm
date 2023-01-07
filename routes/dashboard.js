const express = require('express');
const router  = express.Router();
const { userLikes } = require('../db/queries/likedCars');
const { userCars } = require('../db/queries/userCars');
const app = express()
const bodyParser = require('body-parser');


app.use(bodyParser.json())

router.get('/', async(req, res) => {
  if(!req.cookies.userEmail) {
    res.send("Please login to view your dashboard.")
  } else {
    const likedCars = await userLikes();
    const ownerCars = await userCars();
    res.render('dashboard', { likedCars, ownerCars, userEmail: req.cookies.userEmail});
  }
});


module.exports = router;