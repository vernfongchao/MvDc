const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie } = require('../../utils/auth');
const { User, Question, Answer } = require('../../db/models');


const router = express.Router();


const validateAnswers = [
    check('content')
        .exists({ checkFalsy: true })
        .withMessage('Please add a description to your answer.')
        .isLength({ max: 5000 })
        .withMessage('Answer is too long'),
    handleValidationErrors
];

router.get('/question/:id', asyncHandler(async (req, res) => {
    const answers = await Answer.findAll({ include: User, where: { questionId: req.params.id } });
    return res.json(answers);
}));

router.get('', asyncHandler(async (req, res) => {
    const answers = await Answer.findAll({ include: User });
    return res.json(answers)
}))


router.put('/:id', validateAnswers, asyncHandler(async (req, res) => {
    const { id, content, userId, questionId } = req.body

    let parseUserId = parseInt(userId, 10)
    let parseQuestionId = parseInt(questionId, 10)
    let answer = await Answer.update({
        content,
        userId: parseUserId,
        questionId: parseQuestionId
    }, {
        where: { id }
    })

    answer = await Answer.findByPk(id, { include: { model: User } })

    return await res.json(
        answer
    );
}))




router.post('/question/:id', validateAnswers, asyncHandler(async (req, res) => {
    const { content, userId, questionId } = req.body
    let parseUserId = parseInt(userId, 10)
    let parseQuestionId = parseInt(questionId, 10)

    const answer = await Answer.create({
        content,
        userId: parseUserId,
        questionId: parseQuestionId
    })

    const user = await User.findByPk(parseUserId)
    answer.dataValues.User = user
    return res.json(
        answer
    );
}))


router.delete('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10)
    const answer = await Answer.findByPk(id)
    await answer.destroy()
    return res.json(answer)
}))


module.exports = router;