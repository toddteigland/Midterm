const express = require('express');
const router  = express.Router();


router.post('/', (req, res) => {
  res.clearCookie('userEmail');
  res.json({});
})


module.exports = router;