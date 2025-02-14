const fname = "Dan"
const sname ="Kitheka"
console.log("hello " + fname + " " + sname)
console.log("hello ", fname, " " , sname)

// after ES6
console.log(`Hello ${fname} ${sname}`)

// template literals enable multistring

const message = `Hello
How are you
I am human`
console.log(message)

//  string interpolation

const price = 20
const discount = 0.2

console.log(`The price of the item is $${price} after a ${discount * 100}% discount`)

//  template literals in html

const name = "John"
const age = 30

console.log(`<h1>Hello ${name}, you are ${age} years old</h1>`)

// template literals can be used in conditionals

const isLoggedIn = true

console.log(`Welcome ${isLoggedIn ? name : "Guest"}`)


// template literals with react(jsx)
//  return isAdmin ? `<div`
