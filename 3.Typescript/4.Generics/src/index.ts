// Introduction to Generics generic=not specific
// They allow us to create reusable components that work with a variety of types rather than a single one . they act as placeholders for types

import { get } from "http"

function getFirstElement<T>(arr: T[]): T {
    return arr[0]
}

const numbers = [1,2,3]
const strings = ["apples","mango",'orange']

const firstNmumber = getFirstElement(numbers)
const firstString = getFirstElement(strings)

console.log(firstNmumber);//TS automatically infers it to number
console.log(firstString);//TS automatically infers it to string

// Using genrics with functions
// 1. single genric parameter

function getLength<T>(arr: T[]): number {
    return arr.length
}

console.log(getLength(numbers)) // 3

// 2. multiple genric parameters

function mergeArrays<T, U>(arr1: T[], arr2: U[]): (T | U)[] {
    return [...arr1, ...arr2]
}

console.log(mergeArrays(numbers, strings)) // [1, 2, 3, "apples", "mango", "orange"]


// function reverseArray<T>(arr: T[]): T[] {
//     return arr.reverse()
// }
// const numArr = [1,2,3]

// console.log(reverseArray(numArr));

function mergeObjs<T, U>(obj1: T, obj2: U){
    return {...obj1, ...obj2}
}
    const objA = {name: 'foo', age: 36}
    const objB = {city: 'New York', job: 'Developer'}

    console.log(mergeObjs(objA, objB));


    // Generic Constraints
// you can limit the types that can be passed as ageneric paramter

function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key]
}
const person = {name: 'John', age: 16,}
const name = getProperty(person, 'name')
console.log(name);


// default types generics

function createArray<T = string>(length: number, value: T): T[] {
    return Array.from({length}, () => value)
}

function createPair<T = string, U = number>(value1 :string, value2 :number) {
    return [value1, value2] 
}

console.log(createArray(3, 'hello')); // ['hello', 'hello', 'hello']

console.log(createPair('hello', 10)); // ['hello', 10]

// Generics with interfaces and types

interface KeyValuePairs<K, V>{
    key: K; value: V;
}

const numPairs: KeyValuePairs<string, number> = {
    key: 'id',
    value: 123
}


// Type Aliases in Generic

type Result<T> = {
    success: boolean
    data: T;
    error?: string;
}

const successResult: Result<string> = {
    success: true,
    data: 'Hello'
}

// Conditional Types with Generics

// type IsString<T> = T extends string ? 'Yes' : 'No'
function IsString<T> (value: T) {
    if (typeof value === 'string') {
        console.log('yes');
    }else{
        console.log('No');
    }
}
const Result1 = IsString('hello')
console.log(Result1);

