const express = require('express');
var router = express.Router();	


/* GET home page. */	/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');	
});

// Author page.
router.get('/author', (req, res, next) => {
    res.render('author');
});


module.exports = router;