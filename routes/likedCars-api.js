const express = require('express');
const router  = express.Router();
const { userLikes } = require('../db/queries/likedCars');

router.get('/', (req, res) => {
  userLikes()
    .then(likes => {
      res.json({ likes });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
})

module.exports = router;