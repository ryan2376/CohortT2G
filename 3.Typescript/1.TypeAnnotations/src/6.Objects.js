"use strict";
// defininf an object literal in TS
{ }
const person = {
    name: 'John Doe',
    age: 30,
};
//  by default TS infers object
// const person = {
//     name: string,
//     age: number,
// }
// explicit types annotations/ inline type
const person1 = {
    name: 'John Doe',
    age: 30,
};
const person2 = {
    name: 'John Doe',
    age: 30,
};
const person3 = {
    name: 'John Doe',
};
const manager = {
    employeeId: 1,
    employeeName: 'John Doe',
    departmentName: 'HR',
};
console.log(manager.departmentName);
const myDog = {
    name: 'Softie',
    age: 2,
    breed: 'Labrador',
};
console.log(myDog);
//  you can even extend interface and use them in files that neeed it
// Differences btwn Types and Interfaces
// 1. interfaces can be extended but types can only be intercepted and vice versa  
// create object from Dynamic Keys with index signatures 
// a key of an object is always a string and positioned at an index
// const syntax: {[key: string]: anyType - number, string , array}
const dynamicKeyShape = {};
dynamicKeyShape["name"] = "Alice";
dynamicKeyShape["age"] = "30";
console.log(dynamicKeyShape);
const user = {
    id: 1,
    name: 'Alice',
};
// no error if we do not pass in a dynamic key declared - TS is always powerful to the minimal
console.log(user);
const user2 = {
    id: 1,
    name: 'Alice',
    age: 30,
};
console.log(user2);
const nameAndAge = {
    name: " Alice",
    age: 23
};
const withoutLocation = {
    name: " Alice",
    age: 23
};
// type assertions and casting
// you can explicitly tell TS the type of of an object using type assertions
// const animalObj: Animal2 = {
//     name: 'Fido',
//     age: 3,
//     breed: 'Labrador',
// }
const someValues = "hello TS";
const strLength = someValues.length;
console.log(strLength);
// casting
const fname1 = {
    name: 'Alice'
};
// casting can be used to convert a value from one type to another
const numberValue = 10;
const strValue = String(numberValue);
// Type guards and type assertions
function isAnimal(obj) {
    return obj.name !== undefined && obj.age !== undefined;
}
const animalObj2 = {
    name: 'Fido',
    age: 3,
    breed: 'Labrador',
};
