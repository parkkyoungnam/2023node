const express = require('express');
const path = require('path');


const app = express();

app.use((req,res, next) => {
    console.log('모든 요청에서 실행됩니다.');
    next();
})

app.set('port', process.env.PORT || 3000);

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.post('/', (req, res) => {
    res.send('hello express post');
})

app.get('/about', (req, res) => {
    res.send('hello express about');
})

app.listen(3000, () => {
    console.log('익스프레스 실행');
})