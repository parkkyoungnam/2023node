const express = require('express')
const path = require('path')
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const multer = require('multer');

const app = express();

app.set('port', process.env.PORT || 3000);
//SET PORT=80 명령어는 하지 말아라.

app.use(morgan('dev'));
app.use(cookieParser('pknpassword'));
app.use(session({
    resave : false,
    saveUninitialized : false,
    secret : 'pknpassword',
    cookie : {
        httpOnly : true,
    },
    //name : 'connect.sid',
}));
// 바디파서의 경우 express 안에 넣어져있음.

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use('/', express.static(path.join(__dirname, 'public-pkn')));
// 요청 경로 /// 실제 경로

app.use((req, res, next) => {
    console.log("모든 요청");
    next();
    // next를 해주어야 아래로 내려감
    // express는 위에서 아래로 실행된다.
})

app.get('/', (req, res, next) => {
    req.session.id = 'hello';
    res.sendFile(path.join(__dirname, './index.html'));
    /*
    req.cookies
    req.signedCookies;
    res.cookie('name', encodeURIComponent(name),{
        expires : new Date(),
        httpOnly : true,
        path : '/',
    })
    res.clearCookie('name', encodeURIComponent(name),{
        httpOnly : true,
        path : '/'
    })
    */
})
    
    

app.get('/json', (req, res) => {
    /*
    res.writeHead(200, {'content-Type': 'apllication/json'});
    res.end(JSON.stringify({hello:'zerocho'}));
    */
   res.json({hello : 'zerocho'});
})

//라우트 매개변수
/*
app.get('/category/node', (req,res) => {
    res.send('category');
})
*/

app.get('/about', (req, res) => {
    res.send('hello express about');
})

app.post('/', (req, res) => {
    res.send('hello express post');
})


app.get('/category/:name', (req,res) => {
    res.send(`category ${req.params.name}`);
})

//에러 미들웨어
app.use((err, req, res, next) => {
    console.error(err);
    res.send('에러 발생');
    //res.staatus(200).send('에러발생'); --> 대부분의 에러는 500,404 인데 200으로 보내서 보안성
})

app.listen(app.get('port'), () => {
    console.log('익스프레스 서버 실행');
})