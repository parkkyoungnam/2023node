/*
var
블록스코프를 무시하기 떄문에, 스코프 밖에서도 해당 변수를 침범할 수 있다.

const
let
블록 스코프 안에서만 변수 가능

const a = 3;
a = 5;
에러

const b = {name : 'zero'};
b.name = 'nero'
가능

const c;
c = ?;
에러

let c = 5;
c = 3;
c = 10;
가능

const를 쓸 일이 훨씬 많다.

*/

//