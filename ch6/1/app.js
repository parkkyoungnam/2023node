const express = require('express');
const path = require('path');


const app = express();

app.use((req,res, next) => {
    console.log('모든 요청에서 실행됩니다.');
    next();
})

app.set('port', process.env.PORT || 3000);

app.get('/', (req,res, next) => {
    res.sendFile(path.join(__dirname, 'index.html'));
    next('route'); // 다음 라우터를 실행하게 된다. --> 실행되나요? 이건 안되고, 그 뒤에 있는 get 실행
}, (req, res) => {
    console.log('실행되나요?');
})

app.get('/', (req, res) => {
    console.log('실행되네여~');
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