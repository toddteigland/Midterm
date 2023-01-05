const express = require('express');
const router  = express.Router();
const app = express();


app.get('/login', (req, res) => {
  console.log('COOKIES:', req.cookies);
  res.send(req.cookies);
})


router.get('/test', (req, res) => {
  // console.log('RESPONSE: ', res);
  res.render('vehicle');
}); 


module.exports = router;