const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { User } = require('../../db/models');
const { setTokenCookie } = require('../../utils/auth.js');
const sessionRouter = require('./session')
const usersRouter = require('./user')
const questionRouter = require('./questions');
const answerRouter = require('./answers')

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/questions', questionRouter)

router.use('/answers', answerRouter)

router.get('/set-token-cookie', asyncHandler(async (_req, res) => {
    const user = await User.findOne({
        where: {
            username: 'Demo-lition'
        }
    });
    setTokenCookie(res, user);
    return res.json({ user });
}));


router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
});




module.exports = router;