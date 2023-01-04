const express = require('express');
const router  = express.Router();
const userLikes = require('./likedCars-api');
const userCars = require('./userCars-api');
const app = express()

app.use('/api/userLikes', userLikes)
app.use('/api/userCars', userCars)


router.get('/', (req, res) => {
  res.render('dashboard', {userLikes, userCars, userEmail: req.cookies.userEmail});
}); 

router.post('/dashboard', (req, res) => {
  res.redirect('/dashboard')
})


module.exports = router;