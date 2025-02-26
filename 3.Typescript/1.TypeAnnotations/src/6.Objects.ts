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
// 1. interfaces can be extended but types can only be intercepted and vice versa  


// create object from Dynamic Keys with index signatures 
// a key of an object is always a string and positioned at an index
// const syntax: {[key: string]: anyType - number, string , array}
const dynamicKeyShape: {[key: string]: string} = {}
dynamicKeyShape["name"] = "Alice"
dynamicKeyShape["age"] = "30"

console.log(dynamicKeyShape);

// example of dynamic key with fixed properties

type User = {
    id: number;
    name: string;
    [key: string]: string | number
}

const user: User = {
    id: 1,
    name: 'Alice',
}
// no error if we do not pass in a dynamic key declared - TS is always powerful to the minimal
console.log(user);

const user2: User = {
    id: 1,
    name: 'Alice',
    age: 30,
}
console.log(user2);


// TS provides utility functions to make it easy to work with typescript
// 1. Partial<T> - makes all the properties of a type optional
// 2. Required<T> - makes all properties of a type required
// 3. Omit<T> - create a new type  by ommiting a set of properties from an existing type
// 4. Pick<T>-  creates a anew type by picking a set of properties 

// partial<T> example

// type Person1 = {
//     name: string;
//     age: number
//     location?: string
// }

// type PartialPerson = Partial<Person1>
// type RequiredPerson = Required<Person1>

// const requiredPerson: RequiredPerson = {
//     name: "BOB",
//     location: "New York"
// }

type Person2 = {
        name: string;
        age: number
        location: string
    }

type NameAndAge = Pick<Person2, "name" | "age">

// you can also create name and age by ommitting location
type WithoutLocation = Omit<Person2, "location">  

const nameAndAge: NameAndAge = {
    name: " Alice",
    age: 23
}

const withoutLocation: WithoutLocation = {
    name: " Alice",
    age: 23
}


// combine known keys and dynamic keys

type DynamicKeys = {
    [key: string]: string | number
}

type CombinedType = NameAndAge & DynamicKeys

// interface supports declaration merging which allows to extend an interface multiple times
// overloads the properties
interface Animal2 {
    name: string;
    age: number;
}

interface Animal2 {
    breed: string
}


// type assertions and casting
// you can explicitly tell TS the type of of an object using type assertions

// const animalObj: Animal2 = {
//     name: 'Fido',
//     age: 3,
//     breed: 'Labrador',
// }

const someValues: unknown = "hello TS"
const strLength: number = (someValues as string).length
console.log(strLength);

// casting
const fname1 = {
    name: 'Alice'
} as {name: string}


// casting can be used to convert a value from one type to another

const numberValue: number = 10

const strValue: string = String(numberValue)

// Type guards and type assertions

function isAnimal(obj: unknown): obj is Animal2 {
    return (obj as Animal2).name !== undefined && (obj as Animal2).age !== undefined
}

const animalObj2: Animal2 = {
    name: 'Fido',
    age: 3,
    breed: 'Labrador',
}