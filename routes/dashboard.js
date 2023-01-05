const express = require('express');
const router  = express.Router();
const { userLikes } = require('../db/queries/likedCars');
const { userCars } = require('../db/queries/userCars');
const app = express()

app.use('/api/userLikes', userLikes)
app.use('/api/userCars', userCars)


router.get('/', async(req, res) => {
  const likedCars = await userLikes();
  const ownerCars = await userCars();
  console.log("likedCars", likedCars);
  console.log("ownerCars", ownerCars)
  res.render('dashboard', { likedCars, ownerCars, userEmail: req.cookies.userEmail});
}); 

router.post('/dashboard', (req, res) => {
  res.redirect('/dashboard')
})

router.get('/dashboard', function(req, res) {
  if (!req.cookies.sessionId) {
    // If the cookie is not present, redirect the user to the login page
    res.redirect('/');
  } else {
    // If the cookie is present, render the dashboard page as usual
    res.render('dashboard', { likedCars: likedCars, ownerCars: ownerCars });
  }
});


module.exports = router;