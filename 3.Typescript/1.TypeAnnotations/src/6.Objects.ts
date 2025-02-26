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