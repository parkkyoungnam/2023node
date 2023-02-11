const express = require('express');
const router = express.Router();
const {renderProfile, renderJoin, renderMain} = require('../controllers/page');

router.use((req, res, next) => {
    res.locals.user = null;
    res.locals.follwerCount = 0;
    res.locals.followingCount = 0;
    res.locals.followingIdList = [];
    next();
})

router.get('/profile', renderProfile);
router.get('/join', renderJoin);
router.get('/', renderMain);

module.exports =  router;
//초록이 작업