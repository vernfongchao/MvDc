const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie } = require('../../utils/auth');
const { User, Question, Answer } = require('../../db/models');

const router = express.Router();

const validateQuestion = [
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a question.')
        .isLength({ max: 255 })
        .withMessage('Question Title must be no more than 255 characters long.'),
    // check('content')
        // .exists({ checkFalsy: true })
        // .withMessage('Please add a description to your question.'),
        // .isLength({ max: 5000 })
        // .withMessage('Content must not be more than 5000 characters long'),
    handleValidationErrors
];

router.get('', asyncHandler(async (req, res) => {
    const questions = await Question.findAll({ include: [{ model: User }, { model: Answer }] });
    return res.json(questions);
}));


router.get('/:id', asyncHandler(async (req, res) => {
    const question = await Question.findByPk(req.params.id,
        { include: [{ model: User }, { model: Answer }] }
    )

    return res.json(question);
}))

router.get('/getmore', asyncHandler(async (req, res) => {
    const questions = await Question.findAll({ limit: 5, include: [{ model: User }, { model: Answer }] });
    return res.json(questions);
}));

router.put('/:id', validateQuestion, asyncHandler(async (req, res) => {
    const { title, content, userId, id } = req.body
    let parseUserId = parseInt(userId, 10)

    let question = await Question.update({
        title,
        content,
        userId: parseUserId
    },
        { where: { id } }
    )

    question = await Question.findByPk(id,
        { include: [{ model: User }, { model: Answer }] })

    return res.json(
        question
    );
}))

router.get('/myquestions', asyncHandler(async (req, res) => {
    const questions = await Question.findAll({ where: { userId }, });
    return res.json(questions);
}));


router.post('', validateQuestion, asyncHandler(async (req, res) => {
    const { title, content, userId } = req.body
    let parseUserId = parseInt(userId, 10)

    const question = await Question.create({
        title,
        content,
        userId: parseUserId
    }, {
        include: { model: User }
    })

    return res.json(
        question
    );
}))

router.delete('/:id', asyncHandler(async (req, res) => {

    const id = parseInt(req.params.id, 10)
    const question = await Question.findByPk(id)
    await question.destroy()
    return res.json(question)

}))





module.exports = router;