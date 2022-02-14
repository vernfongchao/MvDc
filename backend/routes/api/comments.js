const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie } = require('../../utils/auth');
const { User, Question, Answer, Comment } = require('../../db/models');


const router = express.Router();

const validateComments = [
    check('content')
        .exists({ checkFalsy: true })
        .withMessage('Please add a description to your question.')
        .isLength({ max: 1000 })
        .withMessage('Content must not be more than 1000 characters long'),
    handleValidationErrors
];

router.get('', asyncHandler(async (req, res) => {
    const comments = await Comment.findAll({ include: User });
    return res.json(comments)
}))


router.post('/answer/:id', validateComments, asyncHandler(async (req, res) => {
    const { content, userId, answerId } = req.body
    let parseUserId = parseInt(userId, 10)
    let parseAnswerId = parseInt(answerId, 10)

    const comment = await Comment.create({
        content,
        userId: parseUserId,
        answerId: parseAnswerId
    })
    const user = await User.findByPk(parseUserId)
    comment.dataValues.User = user
    return res.json(
        comment
    );
}))

router.put('/:id', validateComments,asyncHandler(async(req,res)=> {
    const {id, content,userId,answerId} = req.body

    let comment = await Comment.update({
        content,
        answerId,
        userId
    }, {where : {id}})
    comment = await Comment.findByPk(id,{include:{model:User}})
    return await res.json(comment)
}))




router.delete('/:id', asyncHandler(async (req, res) => {
    const parseId = parseInt(req.params.id, 10)
    const comment = await Comment.findByPk(parseId)
    await comment.destroy()
    return res.json(parseId)
}))


module.exports = router;






