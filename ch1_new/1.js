const example = { a:123, b:{c:135, d:146}}

const {a, b: {c}} = example;

console.log(a);
console.log(c);

/*
const a = example.a;
const d = example.b.d;

console.log(a, " ", d)
*/

/*
arr = [1,2,3,4,5]
const x = arr[0]
const y = arr[1]
*/

arr = [1,2,3,4,5]
const [x,y,,,z] = arr;
console.log(x);
console.log(y);
console.log(z);


/*
    const promise = new Promise(...)
    promise.then((result) => ...)

    const result = await promise;

    async function main()
    {
        const result = await promise
        //return 'pkn';
        //return result;
    }
    main().then((name) => ...)
    const name = await name()

    async functino main()
    {
        try{
             const result = await promise
            //return 'pkn';
            //return result;
        }
        catch(error)
        {
            console.log(error)
        }
    }
*/

const m = new Map();
m.set('a', 'b')
m.set('c', 'd')

console.log(m.get('a'))

const obj = {key : 'key'}
m.set(obj, 123)
console.log(m.get(obj))

/*
    m.set({a : 'b'}, 123)
    console.log(m.get({a : 'b'}))
    오류 발생
    {a:'b'} !== {a:'b'} (참)
*/

