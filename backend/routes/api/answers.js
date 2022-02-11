const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie } = require('../../utils/auth');
const { User, Question, Answer } = require('../../db/models');


const router = express.Router();

router.get('/question/:id', asyncHandler(async (req, res) => {
    const answers = await Answer.findAll({ include: User, where: { questionId: req.params.id } });
    return res.json(answers);
}));

router.get('', asyncHandler(async (req, res) => {
    const answers = await Answer.findAll({ include: User});
    return res.json(answers)
}))

module.exports = router;