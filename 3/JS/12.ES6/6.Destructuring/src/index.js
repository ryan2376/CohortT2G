// destructuring is an ES6 feature that us access variable objects/arrays
// syntax

// const {prop1, prop2} =objectName

// function renderPaymentModule(admin, isAuth) {

// }
// <renderPaymentModule />

const info = {
    fname: 'dennis',
    sname: 'Muhia',
    idNumber: '23456456',
}

// trad ways of accessing values
console.log(`${info.fname} ${info.sname}`)

// destructuring

// const {objectKey:value} = objectName

const { fname: firstname, sname: lastname } = info

console.log(`${firstname} ${lastname}`)

// destructuring with default values
const numbers = [1, 2]
const [first = 10, second = 20, third = 30] = numbers
console.log(third)  //30

// object destructuring with default values

const person = {
    name: 'John',
    age: 25,
}

const { name, age, city = 'Meru' } = person
console.log(city)

// default values with renaming

const person2 = {
    name: 'Jane',
    age: 30,
    address: {
        city: 'Nairobi',
    }
}

// const {name: fullName, age: personAge, address: {city: hometown = 'Mombasa'}} = person2
// console.log(hometown)

// destructuring in array 

const arr = [1, 2, 3]
// const [firstNum, , thirdNum] = arr
// console.log(thirdNum)  //3



// nested objects
const nestedObj = {
    person: {
        name: 'John',
        age: 25,
    },
    city: 'Meru',
}
console.log(nestedObj.person.age)

//  destucturing complex objects
const complexObj = {
    person: {
        name: 'John',
        age: 25,
        address: {
            city: 'Meru',
            country: 'Kenya',
        },
    },
}

const { person: { age: personAge, address: { city: hometown } } } = complexObj
console.log(personAge, hometown)  //25 Meru

// destructuring with nested arr
const nestedArr = [1, [2, 3]]
const [firstN, [secondN, thirdN, fourthN = 4]] = nestedArr
console.log(fourthN)  //3

// destructuring function parameters

function getPersonDetails({ name, age }) {
    console.log(`Name: ${name}, Age: ${age}`)
}

getPersonDetails({ name: 'John', age: 25 })
