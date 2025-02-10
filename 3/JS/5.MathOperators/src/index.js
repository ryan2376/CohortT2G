let num1 = 20
let num2 = 30

console.log(num1 + num2)
console.log(num1 * num2)
//increment and decrement operators
// ++ adds one to the value
//post increment
let salary = 90000
console.log(salary++)
console.log(salary)

//preincrement
let salary1 = 90000
console.log(++salary1)

const marks = [56, 45, 67, 87]
for (let i = 0; i < marks.length; i++) {
    console.log(`${marks.indexOf(marks[i])}: ${marks[i]}`)
    if(i === marks.indexOf(marks[i])){
        console.log(true)
    }else{
        console.log("i have stopped")
    }
    
}