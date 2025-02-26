"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// we can add it as a type annotation to a new variable 
let cow1 = {
    name: "Bess",
    breed: "Bulldog",
    isDomestic: true,
    type: "Mammal",
    age: 5,
};
// let us use it
let cat = {
    name: "Cat",
    type: "Amphibian",
    age: 5,
    breed: "Persian",
    isDomestic: false,
};
// we can also use the type aliases in functions
const getAnimalDescription = (animal) => {
};
getAnimalDescription(cat);
let userId = 686868;
userId = "nioiobob";
console.log(userId);
// share types acroos different modules 
// export type student = {
//     name:string,
//     age: number,
//     grade: number,
// }
// reusable and sharable
// import {student} from './1.basicTypes'
const Jabal = {
    name: "Jabal",
    age: 25,
    grade: 100,
};
console.log(Jabal);
let getRectangleArea = (area) => {
    return area.width * area.height;
};
let getRectanglePerimiter = (perimeter) => {
    return 2 * (perimeter.width + perimeter.height);
};
let rectangle = {
    width: 3,
    height: 2,
};
console.log(`Area of rectangle: ${getRectangleArea(rectangle)}`);
console.log(`Perimeter of rectangle: ${getRectanglePerimiter(rectangle)}`);
