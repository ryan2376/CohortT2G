// arrow fxns

// const functionName = () => { return } pass in a return keyword
// const functionName = () => () return immediately


const doubleArrowFn = (n) => {
    return n * n
}

const arrowReturnImmediateFn = (n) => (
    n * n
)

const arrowReturnImmediateFn1 = (n) => n * n

// parameters in functions
// Single parameters(no parenthesis needed)
const square = n => n * n
console.log(square(4))

// multiple parameters - we must put them in ()
const add = (a, b) => a + b

console.log(add(2, 3))

// no parameters - no parenthesis needed

const greet = () => console.log('Hello')

greet()


//  This keyword in Arrow functions
// traditional fxns handle this keyword differently from arrow fxns

let myVar = 0

// function myFunction(myVar) {
//     this.myVar = 2
//     setTimeout(() => {
//         this.myVar++
//         console.log(this.myVar)
//     }, 5)
// }
// console.log(myFunction(5))
// this - the global object


// arrow fxn with this keyword

class Counter {
    constructor(){
        this.count = 0
    }

    increment(){
        setTimeout(() => {
            this.count++
            console.log(this.count)
        }, 1000)
    }
}

const counter = new Counter()
counter.increment()
