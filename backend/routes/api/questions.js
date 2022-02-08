const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie } = require('../../utils/auth');
const { User, Question } = require('../../db/models');

const router = express.Router();

const validateQuestion = [
    check('title')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Please provide a question.')
        .isLength({ max: 255 })
        .withMessage('Your question must be no more than 255 characters long.')
        .custom((value) => {
            return Question.findOne({ where: { title: value } })
                .then((question) => {
                    if (question) {
                        return Promise.reject('That question has already been asked');
                    }
                })
        }),
    check('content')
        .exists({ checkFalsy: true })
        .withMessage('Please add a description to your question.'),
    handleValidationErrors
];

router.get('', asyncHandler(async (req, res) => {
    const questions = await Question.findAll();
    res.json(questions);
}));


router.post('', validateQuestion, asyncHandler(async (req, res) => {
    const { title, content, userId } = req.body
    let parseUserId = parseInt(userId, 10)

    const question = await Question.create({
        title,
        content,
        userId: parseUserId
    })
    return res.json(
        question
    );
}))




module.exports = router;