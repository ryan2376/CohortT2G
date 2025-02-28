// In object-oriented programming (OOP), while both encapsulation and abstraction are crucial concepts for structuring code, encapsulation focuses on bundling data and methods within a class to control access and protect data integrity, while abstraction focuses on hiding complex implementation details and presenting only the essential functionalities of an object, simplifying its usage;

// 1. creating a class
// we use class keyword

// class Car {
//     // properties (data)
//     brand: string;
//     model: string;
//     year: number;

//     // methods (functions)
//     constructor(brand: string, model: string, year: number) {
//         this.brand = brand;
//         this.model = model;
//         this.year = year;
//     }

//     getDetails() {
//         return `Car Details: ${this.brand} ${this.model} (${this.year})`;
//     }
// }

// class StudentMarks {
//     name: string;
//     marks: number[];
// }

//  TS throws error because name and marks are initialized to fix this issue we need to add a constructor

// 2. Adding a constructor- a special method that run when a new instance of the class is created. Its used to initialize the object's properties

// interface StdMarksType{
//     name: string;
//     marks: number[];
// }

// class StudentMarks {
//     name: string;
//     marks: number[];



//     constructor(stdObj: StdMarksType){
//         // initialize the properties
//         this.name = stdObj.name;
//         this.marks = stdObj.marks;
//     }
// }

// // new instance of Student
// const stdMarks = new  StudentMarks(data)
// console.log(stdMarks);

class StudentMarks {
    name: string;
    marks: number[];



    constructor(){
        // initialize the properties
        this.name = "John Doe";
        this.marks = [12,43,56,77,99];
    }
}

// when we create an instance of studentMarks, the properties will be initialized
const loopMarks = new StudentMarks()
console.log(loopMarks);


// 3.Adding arguments to constructor
class Album {
    title: string;
    artist: string;
    year: number;


    // // create an instance of Album with constructor arguments

    constructor(title: string, artist: string, year: number) {
        this.title = title;
        this.artist = artist;
        this.year = year;
    }
}

// we can also create an interface for your properties

interface AlbumType{
    title: string;
    artist: string;
    year: number;
}

class Album1 {
    title: string;
    artist: string;
    year: number;


    // // create an instance of Album with constructor arguments

    constructor(options: AlbumType) {
        this.title = options.artist;
        this.artist = options.artist;
        this.year = options.year;
    }
}

// you can now create instances with custom values
// const plasticBand =  new Album(
//     {
//         title: "Plastic Band",
//         artist: "The Plastic Band",
//         year: 1999
//     }
// )

// 4.Class prperties
// Default values(property initializer)

// class Album3 {
//     title: "Unknown",
//     artist: "Unknown",
//     year: 045;
// }

// readonly properties

// class Album4 {
//     readonly title: string
//     readonly artist: string
//     readonly year: number
// }

// constructor(opts: AlbumType) {
//     this.title = "Unknown";
//     this.artist = "Unknown";
//     this.year = 045;
// }

// Visiblity Modifiers to control access to class members

// public- default
// , private- accessible within the class
// , protected - accessible within the class and its sub classes

class Album5 {
    public title?: string = "Unknown";
    private artist: string = "Unknown";
    protected year: number = 45;
}


// 6. methods are functions defined within a class and can interact within a class

class Album6 {
    title: string;
    artist: string;
    year: number;

    constructor(title: string, artist: string, year: number) {
        this.title = title;
        this.artist = artist;
        this.year = year;
    }

    getDetails() {
        console.log( `Album Details: ${this.title} by ${this.artist} (${this.year})`);
    }
}

// const album = new Album6({
//     title: "Plastic Band",
//     artist: "The Plastic Band",
//     year: 1999
// });

// album.getDetails();


// 7. Inheritance 
// classes can inherit properties and methods from other classes using the extends keyword

class Album7 extends Album6 {
    constructor(title: string, artist: string, year: number, public genre: string) {
        super(title, artist, year);//used to call the parent class constructor
    }

    getDetails() {
        console.log(`Album Details: ${this.title} by ${this.artist} (${this.year}) - ${this.genre}`);
    }
}

// 8. Abstract Classes
// abstract class -you cannot create directly instantiate it- meant to be extended by other classes
// All properties in abstract must be abstract properties
// dont / cant pass constructor in abstract classes

abstract class Animal {
    abstract makeSound(): void;
    abstract getName(): string;

}


// 9. Getters and setters
// Why we use them
// Encapsulation

// class Person {
//     private _name: string;
//     constructor(name: string) {
//         this._name = name;
//     }
// }


// 10. Implements KeyWord
// enforce that a class adheres to a specific structure defined by a interface
// this is great way to achieve consistency and type safety, especially in large applications where multiple classes should have the same structure

interface PersonInterface {
    name: string;
    age: number;
    greet(): void;
}

class Person1 implements PersonInterface {
    name: string;
    age: number;
    greet() {
        console.log(`Hello, my name is ${this.name}`);
    }


    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

// here we enforced the structure of the class to look like the way we wanted

// 11. Override Keyword
// we use override keyword in a subclass to ensure youre intentionally overriding a parent method

class Animal1 {
    makeSound() {
        console.log("Animal makes a sound");
    }
}

class SpecialSounds extends Animal1{
    override makeSound() {
        console.log("Special Edition Animal makes a sound");
    }
}