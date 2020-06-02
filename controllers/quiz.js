const models = require("../models");

// Autoload el quiz asociado a :quizId
exports.load = (req, res, next, quizId) => {

    const quiz = models.quiz.findById(Number(quizId));

    if (quiz) {
        req.quiz = quiz;
        next();
    } else {
        throw new Error('There is no quiz with  id=' + quizId);
    }
};


exports.index = (req, res, next) => {

    res.render('../views/index', {quizzes : models.quiz.findAll()});
};


exports.show = (req, res, next) => {

    const {quiz} = req;
    res.render('../views/show', {quiz});

};


exports.new = (req, res, next) => {

    const quiz = {
        question: "", 
        answer: ""
    };

    res.render('../views/new', {quiz});
};


exports.create = (req, res, next) => {
    
    const {question, answer} = req.body;

    let quiz = {
        question,
        answer
    };


    if (!quiz.question || !quiz.answer) {
        res.render('quizzes/new', {quiz});
         return;
    }

    quiz = models.quiz.create(quiz);
    res.redirect('/quizzes/' + quiz.id);
    
};


exports.edit = (req, res, next) => {
    const {quiz} = req;
    res.render('../views/edit', {quiz});
};


exports.update = (req, res, next) => {

    let {quiz, body} = req;
    quiz.question = body.question;
    quiz.answer = body.answer;
    models.quiz.update(quiz);   
    res.redirect('/quizzes/' + quiz.id);
};


exports.destroy = (req, res, next) => {

    models.quiz.destroy(req.quiz);
    res.redirect('/quizzes');

};


exports.play = (req, res, next) => {

    const {quiz, query} = req;
    const answer = query.answer || '';
    res.render('../views/play', {
        quiz,
        answer
    });

};


exports.check = (req, res, next) => {

    const {quiz, query} = req;

    const answer = query.answer || "";
    const result = answer.toLowerCase().trim() === quiz.answer.toLowerCase().trim();
    res.render('../views/result', {
            quiz,
            result,
            answer
    });
};