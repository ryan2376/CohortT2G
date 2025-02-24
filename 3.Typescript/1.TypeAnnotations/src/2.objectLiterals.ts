// interface infoTypes {
//     name: string[],
//     age: number,
//     areChamps: boolean,
// }

// const info = {
//     name: ["ed","edd","eddy"],
//     age: 35,
//     areChamps: true,
// }

// when defining an object type we use {} braces to contain their properties & types

const syntaxObjParam = (info: {}) => {

}



const talkToAnimal = (animal: { name: string, type: string; age: number}) => {
    console.log(animal.name, animal.type, animal.age);
}

const cow ={
    name: "cow", 
    type: "mammal", 
    age: 12
}
    talkToAnimal(cow)
// type animal = {
//     name: string,
//     animalType: string,
//     age: number,
// }
//  ? - tells it to be optional

const concatName = (user: {first: string, last: string}) => {
    return `${user.first} ${user.last}`;
}

const fullName = {
    first: "John",
    last: "Doe"
}

console.log(concatName(fullName)); 