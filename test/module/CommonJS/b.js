let a = 5
let obj = {
    a:'a',
    b:'b'
}
setTimeout(() => {
    a = 6
    obj.c = 'c'
}, 2000);

module.exports = {
    a,
    obj
}


