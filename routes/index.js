const express = require('express');
var router = express.Router();	
const quizController = require('../controllers/quiz');

router.param('quizId', quizController.load);

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('../views/home');	
});

// Author page.
router.get('/author', (req, res, next) => {
    res.render('../views/author');
});


// Routes for the resource /quizzes
router.get('/quizzes',                     quizController.index);
router.get('/quizzes/:quizId(\\d+)',       quizController.show);
router.get('/quizzes/new',                 quizController.new);
router.post('/quizzes',                    quizController.create);
router.get('/quizzes/:quizId(\\d+)/edit',  quizController.edit);
router.put('/quizzes/:quizId(\\d+)',       quizController.update);
router.delete('/quizzes/:quizId(\\d+)',    quizController.destroy);
router.get('/quizzes/:quizId(\\d+)/play',  quizController.play);
router.get('/quizzes/:quizId(\\d+)/check', quizController.check);


module.exports = router;