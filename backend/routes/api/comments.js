const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie } = require('../../utils/auth');
const { User, Question, Answer, Comment } = require('../../db/models');


const router = express.Router();



router.get('', asyncHandler(async (req, res) => {
    const comments = await Comment.findAll({ include: User });
    return res.json(comments)
}))






module.exports = router;






