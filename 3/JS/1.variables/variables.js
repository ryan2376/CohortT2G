let age = 25
const schoolName = "Greenwood High"
let studentList = []

// let- Allows you to change a variable and assign it something else
// const - is a constant variable which does not allow you to change a variable
// var is the old way of creating variables which is not commonly used today

// Which of the following variable names is invalid?
// let $price = 100;
// let 1stPlace = "John";
// let _score = 89;
// let userName = "Alice";
// incorrect is 1stPlace = "John"; starts with a number

// Why is the following variable name incorrect?
// const #taxRate = 0.16;  
    // starts with a hash tag

    // 6.
    // Rewrite this variable name to follow best practices:
    // let MyvariableNAME = "JavaScript";
    let myVariableName = "JavaScript";

    // 3. Identifying Data Types
    // What will be the output of the following?
    // console.log(typeof "Hello"); = string;
    // console.log(typeof 99); = integer
    // console.log(typeof true); = boolean  
    // console.log(typeof undefined); = null

    // 8.
    // Identify the data types in this array:
    // let data = ["Kenya", 34, false, { country: "USA" }, null]; string, integer, boolean, object, object
    // 9. How do you define a BigInt in JavaScript? Provide an example.
    let num = BigInt(1000000000000000); //
    // 4. Objects & Arrays
    // 11. Create an object person with properties name, age, and city.
    let person = {"name": "Ryan", "age": 22, "city": "Nairobi"}
    console.log(person)
    // 12. Add a new property email to the person object.
    person.email = "ryan@gmail.com";
    console.log(person)
    // 13. Declare an array fruits with three fruit names.
    let fruits = ["orange", "mango", "banana"]
    // 14. Access the second item in the fruits array.
    console.log(fruits[1])
    // 5. Type Coercion
    // 15. What will be the output of the following?
    // console.log("5" + 2);= 52
    // console.log("5" - 2);= 3
    // 16. Convert the string "100" into a number.
    let numString = "100";
    let numNumber = Number(numString);
    console.log(numNumber)
    // 
    // 17. Convert the number 50 into a string.
    let numInt = "50"
    let numStr = String(numInt);
    console.log(typeof(numStr))
    // 18. What will be the result of this operation?
    // console.log(5 + true);=6