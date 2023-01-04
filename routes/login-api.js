const express = require('express');
const router  = express.Router();
const cookieParser = require('cookie-parser')
const userQueries = require('../db/queries/users');

router.use(cookieParser());

router.post('/login', (req, res) => {
  userQueries.getRandomUser()
  .then(user => {
    res.cookie('userEmail', user.email, { expires: new Date(Date.now() + 600000), httpOnly: true })
    console.log(user)
    res.redirect("/")
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
});

module.exports = router;