const express = require('express');
const router  = express.Router();


router.post('/', (req, res) => {
  res.clearCookie('userEmail');
  res.redirect('/');
})


module.exports = router;