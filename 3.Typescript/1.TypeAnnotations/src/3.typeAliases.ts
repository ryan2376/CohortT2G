
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
let cat: Animal = {
    name: "Cat",
    type: "Amphibian",
    age: 5,
    breed: "Persian",
    isDomestic: false,
}