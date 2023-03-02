const {User, Post} = require('../models');

exports.renderProfile = ((req, res, next) => {
    res.render('profile', {title:'내 정보 - NodeBird'});
});

exports.renderJoin = ((req, res, next) => {
    res.render('join', {title : '회원가입 - NodeBird'});
});

exports.renderMain = async (req, res, next) => {
    try {
      const posts = await Post.findAll({
        include: {
          model: User,
          attributes: ['id', 'nick'],
        },
        order: [['createdAt', 'DESC']],
      });
      res.render('main', {
        title: 'NodeBird',
        twits: posts,
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

//컨트롤러 : 요청과 응답이 뭔지 알고 있으며,
//서비스 : 요청과 응답을 모른다.