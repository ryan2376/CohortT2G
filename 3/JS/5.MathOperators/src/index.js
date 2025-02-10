let num1 = 20
let num2 = 30

console.log(num1 + num2)
console.log(num1 * num2)
//increment and decrement operators
// ++ adds one to the value
//post increment
let salary = 90000
console.log(salary++)
console.log(salary)

//preincrement
let salary1 = 90000
console.log(++salary1)

const marks = [56, 45, 67, 87]
for (let i = 0; i < marks.length; i++) {
    console.log(`${marks.indexOf(marks[i])}: ${marks[i]}`)
    if(i === marks.indexOf(marks[i])){
        console.log(true)
    }else{
        console.log("i have stopped")
    }
    
}

//math objects
console.log(typeof Math)

let radius = 7
console.log(Math.PI * radius**2)
console.log(Math.sqrt(16))

let numbers = [1,2,3,4,5,6,7]
numbers.forEach((number) => console.log(Math.max(number)))

// math.random - return a pseudo random number btwn 0 and 1
// generates different numbers

const invoiceNmumbers = Math.random() * 10000000000000
console.log(`BSNRTY${Math.floor(invoiceNmumbers)}`)

//returns the largest integer less than or equal to
console.log(Math.floor(4.5))

//returns the smallest integer of the input greater than or equal to
console.log(Math.ceil(4.5))

//math.round == to te nearest integer

console.log(Math.round(4.4))

import { v4 } from "uuid";

console.log(v4())