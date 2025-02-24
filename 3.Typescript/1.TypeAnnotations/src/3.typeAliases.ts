import { get } from "http"
import { student } from "./1.basicTypes"

// defining types and reusable
type Animal = {
    name?: string,
    age?: number,
    type: string,
    breed: string,
    isDomestic: boolean,
}

// we can add it as a type annotation to a new variable 

let cow1: Animal = {
    name: "Bess",
    breed: "Bulldog",
    isDomestic: true,
    type: "Mammal",
    age: 5,
}

// let us use it
let cat = {
    name: "Cat",
    type: "Amphibian",
    age: 5,
    breed: "Persian",
    isDomestic: false,
}

// we can also use the type aliases in functions
const getAnimalDescription = (animal: Animal) => {
    
}

getAnimalDescription(cat)

// type aliases as basic types
type id = string | number
let userId:id = 686868
userId = "nioiobob"
console.log(userId);

// share types acroos different modules 
// export type student = {
//     name:string,
//     age: number,
//     grade: number,
// }

// reusable and sharable
// import {student} from './1.basicTypes'
const Jabal: student = {
    name: "Jabal",
    age: 25,
    grade: 100,
    
}
console.log(Jabal);

// type Animal = {
//     name?: string,
//     age?: number,
//     type: string,
//     breed: string,
//     isDomestic: boolean,
// }
// let cow1: Animal = {
//     name: "Bess",
//     breed: "Bulldog",
//     isDomestic: true,
//     type: "Mammal",
//     age: 5,
// }

type Rectangle = {
    width: number,
    height: number,
}

let getRectangleArea  = (area: Rectangle) => {
    return area.width * area.height;
}

let getRectanglePerimiter = (perimeter: Rectangle) => {
    return 2 * (perimeter.width + perimeter.height);
}

let rectangle: Rectangle = {
    width: 3,
    height: 2,
}

console.log(`Area of rectangle: ${getRectangleArea(rectangle)}`);
console.log(`Perimeter of rectangle: ${getRectanglePerimiter(rectangle)}`);