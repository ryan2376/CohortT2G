// defininf an object literal in TS

{}

const person = {
    name: 'John Doe',
    age: 30,
    
}

//  by default TS infers object

// const person = {
//     name: string,
//     age: number,
    
// }

// explicit types annotations/ inline type

const person1: {name: string, age: number,} = {
    name: 'John Doe',
    age: 30,
}

// 2. using type to define object shapes

type PersonType = {
    name: string,
    age: number,
}

const person2: PersonType = {
    name: 'John Doe',
    age: 30,
}

// YOU CAN PASS optional properties using ? operator

type OptionalPersonType = {
    name: string,
    age?: number,
}

const person3: OptionalPersonType = {
    name: 'John Doe',
}

// intersection of types
// Allows you to combine multiple types into one type. This is useful when you want to create a new type that has all the properties of the combined types

type StudentType = {
    name: string,
    age: number,
    grade: number,
}

type Employee = {
    employeeId : number;
    employeeName : string
}

type Department = {
    departmentName : string;
}

type Manager = Employee & Department;

const manager: Manager = {
    employeeId: 1,
    employeeName: 'John Doe',
    departmentName: 'HR',
}

console.log(manager.departmentName);

// Interfaces are other ways of constructing objects
// Similar to types but have more capabilities like extending from other interfaces
// No equal sign but has same same properties as Types

interface Animal {
    name: string;
    age: number;
}
// //  Can be redeclared
// interface Animal{
//     name: string;
//     age: number;
// }

// We can extend the properties of an interface and use them in another interface 

interface Dog extends Animal {
    breed: string
}

const myDog: Dog = {
    name: 'Softie',
    age: 2,
    breed: 'Labrador',
}
console.log(myDog);

//  you can even extend interface and use them in files that neeed it
// Differences btwn Types and Interfaces
// 1. interfaces can be extended but types can only be intercepted