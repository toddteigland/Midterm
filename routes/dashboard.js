const express = require('express');
const router  = express.Router();
const { userLikes } = require('../db/queries/likedCars');
const { userCars } = require('../db/queries/userCars');
const { saveToDatabase } = require('../db/queries/insertCar')
const app = express()
const bodyParser = require('body-parser');
const { response } = require('express');

app.use('/api/userLikes', userLikes)
app.use('/api/userCars', userCars)
app.use('/api/insertCar', saveToDatabase)
app.use(bodyParser.json())

router.get('/', async(req, res) => {
  const likedCars = await userLikes();
  const ownerCars = await userCars();
  // console.log("likedCars", likedCars);
  // console.log("ownerCars", ownerCars);
  res.render('dashboard', { likedCars, ownerCars, userEmail: req.cookies.userEmail});
}); 

router.post('/api/cars', async(req, res) => {
  console.log(req.body)
  saveToDatabase(req.body.make, req.body.model, req.body.yr, req.body.price, req.body.color, req.body.thumbnail_img, req.body.fullsize_img).then(() => {
    res.json({ status: "success" })
  });
  //body pars
  // console.log('----------------------------------------------------------------')
  // console.log('---------------------------------------------------------------')
  // res.redirect('/dashboard', dataSaved)
})

// router.get('/dashboard', function(req, res) {
//   if (!req.cookies.sessionId) {
//     // If the cookie is not present, redirect the user to the login page
//     res.redirect('/');
//   } else {
//     // If the cookie is present, render the dashboard page as usual
//     res.render('dashboard', { likedCars: likedCars, ownerCars: ownerCars });
//   }
// });


module.exports = router;