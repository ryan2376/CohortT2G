function name(...args) {
    // ...args are an indefinite argument passed as an array
}

function say(a, b, c, d, ...chars) {
    // ...chars is an array holding all the remaining arguments
}

// we can use a fxn to return sum of only arguments passed as anumber and ignore the non number

function sum(...args) {
    return args.filter((elem) => (typeof elem === 'number'))
    .reduce((prev, next) => prev + next)
}

let result = sum(1, "Pamela", "hello", 90, undefined, null)
console.log(result)


// spread 
// ... dots pased to an array means create a copy of that array

let arr1 = [1, 2, 3]
let arr2 = [4, 5, 6]

let combinedArray = [...arr1, ...arr2]
console.log(combinedArray)

// add new elements to the array

const info = [...combinedArray, "45", {uni: 'DEKUT', isStudent: true}]

console.log(info)

// State is an object and are IMMUTABLE


// js objects must have unique keys
// the later object will override the existing values

const objStd1 = {
    username: "Joseph",
    age: 20,
}

const objStd2 = {
    username: "Pamela",
    age: 21,
}

const objStd3 ={...objStd1, ...objStd2}

console.log(objStd3)

// handling multiple values for a key
let arr = new Array()
console.log(arr instanceof Array)
var obj = {
    key: ["value1", "value2"],
    username: 'string'
}
for(let i in obj){
    console.log(i)//key
    if(obj[i] instanceof Array){
        for(let k = 0; k < obj[i].length; k++){
            console.log(obj[i][k])
        }
    }else{
        console.log(obj[i])
    }
}
