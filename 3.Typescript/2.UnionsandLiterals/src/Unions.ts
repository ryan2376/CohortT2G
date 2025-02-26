





// declaring union types

const logId = (id: string | number) => {
    console.log(id);
}

logId('eddd')

//  literal types in unions
// literal types allow you to specify exact values a type can have . they are useful for defining a limited set of options

type LogLevel = 'info' | 'warning' | 'error';

const logLevel = (level: LogLevel) => {
    console.log(`Log level: ${level}`);
}

logLevel('warning')

// 6.combine multiple unions to create more complex types

type DigitalFormat = 'MP3' | 'FLAQ'

type PhysicalFormat = "LP" | "CD" | "Cassette"

type AlbumFormat = DigitalFormat | PhysicalFormat
// albumFormat can accept values from either digital or physical format

// 7. narrowing Unions types
// type narrowing is the process of refining a union type to a more specific type. this is often done using 
// typeof operator type gurads and control flow(like if, switch)

const printValue = (value: string | number) => {
    if (typeof value ==='string') {
        console.log(value.toUpperCase());
    } else {
        console.log(value.toFixed(2));
    }
}

printValue('hello')
printValue(1213.5665)

// 8. Literal narrowing
// TS narrows literal types to

type AgeRange = 'child' | 'adult' | 'senior';

const checkAge = (age: number, range: AgeRange) => {
    if (range === 'child' && age < 18) {
        console.log('You are a child');
    } else if (range === 'adult' && age >= 18 && age < 65) {
        console.log('You are an adult');
    } else if (range === 'senior' && age >= 65) {
        console.log('You are a senior');
    }
}

// 9. discriminated Unions
// discriminated uinions are a pattern for narrowing types in TS. they use a common property(called a discriminant) with a literal type
// this allows TS to narrow the union to the the specific typeby checking the discriminant value

interface User {
    type: 'regular' | 'premium';
    name: string;
    // other properties
}

interface PremiumUser extends User {
    type: 'premium';
    // additional properties for premium user
}

const processUser = (user: User) => {
    if (user.type === 'premium') {
        console.log(`Hello, ${user.name}! You are a premium user`);
    } else {
        console.log(`Hello, ${user.name}! You are a regular user`);
    }
}

// 10. Unknown vs never in unions
// unknown the most flexible type. can be anything but requires type checking before usage
// never the most restrictive type represents a value that never 

// let value1: unknownvalue1  = "Hello"



// Type Guards
//  they are expressions or functions that narrow down a union type 

type Car = {
    type: 'car',
    speed: number
}

type Bike = {
    type: 'bike',
    speed: number
}

type Vehicle = Car | Bike
// we have a vehicle type that can be either a car or a bike
// Goal is safely access speed for Car and Gears for Bike

const getVehicleSpeed = (vehicle: Vehicle) => {
    if (vehicle.type === 'car') {
        return vehicle.speed;
    } else {
        return vehicle.speed * 1.2; // assuming gears are 1.2 times faster for bikes
    }
}

// Custom type Guards
// they return a type predicate using the syntax: parameterName is TypeName
function isCar(vehicle: Vehicle): vehicle is Car {
    return vehicle.type === 'car';
}

function isBike(vehicle: Vehicle): vehicle is Bike {
    return vehicle.type === 'bike';
}

// Using Custom Type guards

const getCarSpeedWithGuard = (vehicle: Vehicle) => {
    if (isCar(vehicle)) {
        return vehicle.speed;
    } else {
        return vehicle.speed * 1.2;
    }
}

// type of as narrower


// instance of 
type Dog = {
    sound: string
}
const makeSound = (animal: Dog | Cat) => {
    if (animal instanceof Dog) {
        animal.bark();
    } else if (animal instanceof Cat) {
        animal.meow();
    }
}