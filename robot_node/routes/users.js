var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(res.io.emit)
  res.io.emit("socketToMe", "users");
  res.send('hhh with a resource.');
});

router.post('/haha', function(req, res, next) {
  console.log(res.io.emit)
  res.io.emit("socketToMe", "users");
  res.send('hhh with a resource.');
});

module.exports = router;
