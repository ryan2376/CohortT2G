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

class StudentMarks {
    name: string;
    marks: number[];
}