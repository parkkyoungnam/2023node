const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks'); //리액트 혹은 뷰로 변경 가능
const dotenv = require('dotenv');
const {sequelize} = require('./models');

dotenv.config();
//해당 함수부터 process.env.COOKIE_SECRET이 존재함. 자바스크립트는 위에서 아래로 실행 그렇기 때문에 최대한 위에

const pageRouter = require('./routes/page');

const app = express();
app.set('port', process.env.PORT || 8001);
app.set('view engine', 'html');
nunjucks.configure('views', {
    express:app,
    watch:true,
})

sequelize.sync({force : false})
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.log(err);
    })


app.use(morgan('dev')); //로깅-> 개발 모드
app.use(express.static(path.join(__dirname, 'public'))); //public 폴더를 접근 허용
app.use(express.json()); //json요청
app.use(express.urlencoded({extended : false})); //form 요청
app.use(cookieParser(process.env.COOKIE_SECRET)); //쿠키파서
app.use(session({
    resave : false,
    saveUninitialized : false,
    secret : process.env.COOKIE_SECRET,
    cookie : {
        httpOnly:true,
        secure:false,
    }
}))

app.use('/', pageRouter);
app.use((req,res,next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`)
    error.status = 404;
    next(error);
})

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {}; //에러 로그를 담당하는 서비스로 보낸다.
    res.status(err.status || 500);
    res.render('error'); // error.html로 인식됨
})

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
})