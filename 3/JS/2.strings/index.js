import chalk from "chalk";

let myName = ""
let myBook ="intro to JS"
let statement ='i love books'


let fname = "shakira";

console.log(fname.charAt(3));

let firstName = 'julia';
let secondName = 'roberts';

console.log(firstName.concat(' ' + secondName));//es5

console.log(firstName.concat(` ${secondName}`));//es6

const lName = "Ryan Munene"

console.log(lName.indexOf('M'))

console.log(lName.includes('K'))

console.log(lName.toLowerCase())

console.log("Money".split("").reverse().join(""))

let sentence = "I am a student"
                
console.log(sentence.substring(7,11))//from 7 end at 11-1

console.log(sentence.substr(7, 3)) //from 7 returns 4 characters


let sentence1 = "Hellowz my name is Juma"

console.log(sentence1.substr(2, 5))

let spaced = "     I am Optimus  "
console.log(spaced.trim())
console.log(chalk.yellow(spaced.trimStart()))
