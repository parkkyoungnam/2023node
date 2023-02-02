const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();

app.use(morgan("combined"));
app.use(cookieParser('pknpassword'));
app.use(express.json());
app.use(express.urlencoded({extended : true})); // true -> qs // false : querystring

app.set("port", process.env.PORT || 3000);

app.use((req,res, next) => {
  console.log('모든 요청에서 실행됩니다.');
  next();
})

app.set('port', process.env.PORT || 3000);

app.get('/', (req,res, next) => {
  req.cookies;
  req.signedCookies;

  res.cookie('name', encodeURIComponent(name), {
    expires : new Date(),
    httpOnly : true,
    path : '/',
  })
  res.clearCookie('name', encodeURIComponent(name), {
    httpOnly : true,
    path : '/',
  })
})

app.get('/', (req, res) => {
  //req.body.name; -> express.json()
})

app.get('/category/:name', (req, res) =>{
  res.send(`hello ${req.params.name}`);
})

app.post('/', (req, res) => {
  //res.status(200).send('hello');
  res.send('hello express post');
})

app.get('/about', (req, res) => {
  /*
      res.writeHead(200, {'Content-Type' : 'application/json'});
      res.end(JSON.stringify({hello:'zerocho'}));
  */
 res.json({hello : 'pkn'});
})

app.listen(3000, () => {
  console.log('익스프레스 실행');
})