// let and const offer block scopping
// block scope is a way to control variable scopes better than var

function example(){
    if (true) {
        const x = 10
        console.log(x)
    }
    // console.log(x) // ReferenceError: x is not defined//anything inside curly braces is a scope
}

example() //

const z = 10  //global scope
if (z === 10) {
    const z = 20 //block scope inside {}
    console.log(z)
}

console.log(z) // 10 // z is not reassigned inside the if block

// let and const are not hoisted 

var y = 10

if (y === 10) {
    var y = 20 //fxn or global scope(not block scoped)
    console.log(y)
}

console.log(`The value of y is now ${y}`)

// the var keyword 0 a fxn

