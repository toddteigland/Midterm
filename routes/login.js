const express = require('express');
const router  = express.Router();

router.post('/', (req, res) => {
  const email = 'Kira@email.com'
  res.cookie('userEmail', email)
  res.json({userEmail: email})
});

router.get('/', (req, res) => {
  //check if users logged in
  console.log("HELLO");
  res.json({email: req.cookies.userEmail})
})

module.exports = router;