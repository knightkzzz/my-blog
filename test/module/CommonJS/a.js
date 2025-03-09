let default1 = require('./b.js')
console.log('default1',default1); //default1 { a: 5, obj: { a: 'a', b: 'b' } }
setTimeout(() => {
    console.log('default1',default1); //default1 { a: 5, obj: { a: 'a', b: 'b', c: 'c' } }
}, 2000);



