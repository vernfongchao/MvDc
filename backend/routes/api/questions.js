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

router.post('/', validateQuestion, asyncHandler(async (req, res) => {
    const { title, content, user } = req.body

    const question = await Question.create({
        title,
        content,
        user: user.id
    })
    return res.json({
        question
    });
}))




module.exports = router;