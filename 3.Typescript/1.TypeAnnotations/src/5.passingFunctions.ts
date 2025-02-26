// functions in TS can be passed as arguments to other functions, which is a fundamental concept in functional programming

import { log } from "console"

// function types
// when passing functions its important to define their types

// basic function type definition

// type  functionName = (args: typeOfArgs) => returnType or void

type Mapper = (item: string) => number

// using the function type

const mapOverItems = (items: string[], map: Mapper) => {
    return items.map(map)
}

// you define the function type inline

const mapOverItems1 = (items: string[], map: (item: string) => number) => {
    return items.map(map)

}

// how to use a function that takes another fxn as a parameter

const arrayOfItems = mapOverItems(['1','2','3','4','5'], (item) => {
    return Number(item);
})
console.log(arrayOfItems);

// function with 
// 1. optional parameters

type withOptionsal = (index?:number) => number

// 2.rest parameters

type withRest = (...args: number[]) => number

// 3. multiple parameters 

type withMultipleParams = (a: number, b: number, first: string) => number

// return types
// when defining functions that take other functions as parameters you can specify the return type

type UserType = {
    username: string
    password: string 
}

const loggedInfo = (user: UserType):number => {
    return 123
}
console.log(loggedInfo);

// Async functions
// for synchronous functions the return type should be Promise
type User1 = {
    id: string
}

const getUser = async (id:string):Promise<User1> => {
    const response: Response = await fetch('https/www.ryan.com')
    const data =  response.json()
    return data
}

// passing Generic types to functions
function processItems<T>(items: T[], processor: (items: T) => void): void{
    items.forEach(processor)
}
processItems([1,2,3], (item) => console.log(item * 2));

const data1: Array<number> = [1,2,3,4,5]

data1.map((item) => item * 3)


