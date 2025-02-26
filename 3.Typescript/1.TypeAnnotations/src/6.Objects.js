"use strict";
// defininf an object literal in TS
{ }
const person = {
    name: 'John Doe',
    age: 30,
};
//  by default TS infers object
// const person = {
//     name: string,
//     age: number,
// }
// explicit types annotations/ inline type
const person1 = {
    name: 'John Doe',
    age: 30,
};
const person2 = {
    name: 'John Doe',
    age: 30,
};
const person3 = {
    name: 'John Doe',
};
const manager = {
    employeeId: 1,
    employeeName: 'John Doe',
    departmentName: 'HR',
};
console.log(manager.departmentName);
