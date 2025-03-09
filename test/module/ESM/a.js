import { a } from './b.js'
import default1 from './b.js'
console.log('a',a);   //a 5
console.log('default1',default1); //default1 { a: 'a', b: 'b' }

setTimeout(() => {
   console.log('a',a);
}, 2000);


setTimeout(() => {
    default1.a = 'a1' //不报错
}, 1000);


