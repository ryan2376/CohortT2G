// when we say State is immutable
// let isAdmin = true
// isAdmin = false 

// (prevState) != newState

// mutability refers to the ability of a value to be changed after it has been created

// primitive types are immutable

let str = "hello"
console.log(str.toLowerCase());
console.log(str);

// arrays and objects are mutable
// their contents can be changed even if declared with const

const arr: number[] = [1, 2, 3, 6, 7]
arr.push(23)

console.log(arr);

const obj = { name: "Alice", age: 22 }
obj.age = 35
console.log(obj);

// we can make objects immutable using Readonly property ie Readonly<T>

type User1 = {
    readonly name: string
    age: number
}

const user: User1 = {
    name: "Alice",
    age: 22
}
const readOnlyObj1: Readonly<User1> = {
    name: "Alice",
    age: 22
}



// user.name = "Ryan" // error: Cannot assign to 'age' because it is a read-only property.

// make mutable omit property using omit make it mutable using partial , 


// how to pass types to functions
// basic way to pass types to functions
function greet(name: string): string {
    return `Hello, ${name}!`
}
console.log(greet("Ryan"));

// generics in functions
// generics allow functions to accept different types while preserving type safety
// fxn fxnName<>(args: T){}
function identity<T>(value: T): T{
    return value
}

console.log(identity<string>("545"));

// passing multiple generics 

function merge<T, U>(obj1: T, obj2: U):T & U {
    return {...obj1, ...obj2}
}
const mergedObject = merge({name: "Green"},{age: 5})
console.log(mergedObject);


// Arrays in Typescript
const fruits: Array<string> = ["Apple","mango","Banana"]
const marks: number[] = [1,2,3,4,5,6,7,8]

// promises in typescript
type User = {
    id: string
    name: string
    age: number
    isActive: boolean
}

const data: User = {
    id: "1",
    name: "Alice",
    age: 22,
    isActive: true
}

const fetchData = async (): Promise<User> => {
    const user_data = await data
    return user_data
}

fetchData().then((user_data) => console.log(user_data))

// Sets in TS 
// A set is a collection of unique values
// syntax TS- Set<Type>

const mySet: Set<string> = new Set(["Apple", "Banana", "Apple"])
console.log(mySet.has("red")); // Output: Set {"Apple", "Banana"}

// creating an empty set with specifcif types
const emptySet = new Set<string>()
emptySet.add("Hello")

console.log(emptySet);


// type assertions and casting 
// use as syntax
// use angle bracket syntax

const jsonString = `{"name":"Alice","age":30}`
const parsedData = JSON.parse(jsonString) as {name: string, age: number}
console.log('🚀🚀', parsedData);

// Using Angle brackets
const parsedData2 = <{ name: string; age: number }> JSON.parse(jsonString)

console.log('������', parsedData2);

// rest parameters
const sum = (...numbers: number[]) => {
    return numbers.reduce((prev, next) => prev + next, 0)
}
console.log(sum(1,2,3,4,5,6));

// void keyword - no return type
const logMsg = (message:void) => {
    console.log(message)
}