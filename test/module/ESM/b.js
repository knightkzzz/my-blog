let a = 5
let obj = {
    a:'a',
    b:'b'
}
setTimeout(() => {
    a = 6
    console.log('obj',obj); //obj { a: 'a1', b: 'b' }
    
}, 2000);
export { a }

export default obj

