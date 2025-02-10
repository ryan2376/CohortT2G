// loops in js are 4
// while loop
// do while
// for loop
// for ...of loop
// for...in loop

// while loop

let i = 0;
while (i < 5) {
    console.log(i);
    i++;
}

//do while guarantees the execution of code before it is tested
// do{
//     //do this
// }while(condition)

// let actualPassword = "pa$$word"
// let myInputPassword
// do{
//     let passWordInputValue = prompt("Enter a password")
//     myInputPassword = passWordInputValue
// }while (myInputPassword !== actualPassword) {
//     alert("correct password")
// } until user inputs the correct password

//for loop
const marks = [56, 45, 67, 87];
for (let i = 0; i < marks.length; i++) {
    console.log(`${marks.indexOf(marks[i])}: ${marks[i]}`);
    if (i === marks.indexOf(marks[i])) {
        console.log(true);
    } else {
        console.log("i have stopped");
    }
}

// for...of = used to iterate over iterable objects
const langauges = ["js", "css", "html"]
for (let lang of langauges){
    console.log(`${lang}\n`)
}

// for...in loop = used to iterate over enumerable properties of an object
const myInfo ={
    name: "John Doe",
    age: 30,
    city: "New York",
    info: () => {
        const info = {
            idNumber: 39302928,
            country: "kenya"
        }
        return `ID: ${info.idNumber} country: ${info.country}`
    } 
}

for (const key in myInfo) {
    console.log(`${key}: ${myInfo[key]}`)
}
