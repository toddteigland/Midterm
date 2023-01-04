const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');

router.get('/', (req, res) => {
  console.log("test")
  // userQueries.getUsers()
  //   .then(users => {
  //     res.json({ users });
  //   })
  //   .catch(err => {
  //     res
  //       .status(500)
  //       .json({ error: err.message });
  //   });
  res.render('index', {userEmail: req.cookies.userEmail})
});

module.exports = router;