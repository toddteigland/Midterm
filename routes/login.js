const express = require('express');
const router  = express.Router();

router.post('/', (req, res) => {
  const email = 'Kira@email.com'
  res.cookie('userEmail', email)
  res.json({userEmail: email})
});

module.exports = router;