// normal fxn

function nameOfFunction(params) {
    
}

// arrow fxn
const functionName = () => {}


const salesData = require('./data.json')

function fetchSales() {
    // code inside parenthesis is executed
    console.log(salesData)
}

// each fxn needs to be called into the call stack to await execution
// each execution occurs in a LIFO structure
fetchSales()

// sometimes a fxn may have a return value
//eg a fxn that takes in marks and returns the average and the total

// An argument is a representation of a data type to be passed as an input later when the fxn runs
function myGoodFn(data) {
    return data
}

console.log(myGoodFn({name: 'Ryan', laptop: "Hewlett Packard"}))

// most of the times the argument is used for manipulation e.g looping through it
function average(marksArray) {
    let total = 0;
    for (let mark of marksArray) {
            total += mark
    }
    let average = 0
    average = total / marksArray.length
    return `total is: ${total} and average is: ${average}`
}
console.log(average([30, 24, 67, 80]))

// adding a return type to arrow fxn
const circleArea = (radius) => {
    return `The area of the circle is: ${Math.PI * radius ** 2}`
}
console.log(circleArea(7))

// sometimes arrow fxns return immediately and dont need a return keyword

const circleArea1 =(radius) => (
    `The area of the circle is: ${Math.PI * radius ** 2}`
)

console.log(circleArea1(7))

// immediately invoked fxn
// (() => {}) = immediately invoked arrow function
// (function fName(){})  = immmediately invoked normal function