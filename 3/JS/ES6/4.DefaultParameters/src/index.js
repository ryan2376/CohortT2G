// in es6 it is possible to assign default values in the function declarations

function say(message = 'hi') {
    console.log(message)
}
say() //hi
say('hi') //hi
// a default parameter is a fallback if a parameter is not provided

// single parameter with default fxns
function sum(numA, numB = 5) {
    console.log(numA +numB)

}
sum(10)
sum(5, 15)

// multiple parameters with default values

function multiply(numA = 1, numB = 1, numC = 1) {
    console.log(numA * numB * numC)
}
multiply(2, 3, 4)
multiply(5)

// arrow functions with default parameters
const sayHi = (greet = 'Hi', name = 'Val') => {
    console.log(`${greet} ${name}`)
}
sayHi()
sayHi('Hello')