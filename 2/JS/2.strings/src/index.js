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

// JavaScript String Practice Questions
// 1. Check String Input
// ○ Write a JavaScript function to check whether an 'input' is a string or not.
// Test Data:
// console.log(is_string('w3resource')); // true
// ○ console.log(is_string([1, 2, 4, 0])); // false
    const is_String = (input) => {
    if (typeof input === "string") {
        return true
    } else {
        return false
    }
}
console.log(is_String("red"))

// 2. Check Blank String
// ○ Write a JavaScript function to check whether a string is blank or not.
// Test Data:
// console.log(is_Blank('')); // true
// ○ console.log(is_Blank('abc')); // false
const is_Blank = (input) => {
    if (input === ""){
        return true
    }
    else{
        return false
    }
}
console.log(is_Blank(""))
// 3. String to Array of Words
// ○ Write a JavaScript function to split a string and convert it into an array of words.
// ○ Test Data:
// console.log(string_to_array("Robin Singh")); // ["Robin", "Singh"]
const string_to_array = (input) => {
    return input.split(" ")
}
console.log(string_to_array("Ryan Munene"))

// 4. Extract Characters
// ○ Write a JavaScript function to extract a specified number of characters from a
// string.
// ○ Test Data:
// console.log(truncate_string("Robin Singh", 4)); // "Robi"
const truncate_string = (input, char) => {
    return input.substr(0, char)
}
console.log(truncate_string("Robin Singh", 4)); // "Robi"
// 5. Abbreviate Name
// ○ Write a JavaScript function to convert a string into abbreviated form.
// ○ Test Data:
// console.log(abbrev_name("Robin Singh")); // "Robin S."
const abbrev_name = (input) => {
    let split_name = input.trim().split(' ');
    return(split_name[0] + ' ' + split_name[1].charAt([0]) + "." );
}
console.log(abbrev_name("Robin Singh")); // "Robin S."
// 6. Hide Email Address
// ○ Write a JavaScript function that hides email addresses to prevent unauthorized
// access.
// ○ Test Data:
// console.log(protect_email("robin_singh@example.com")); //
// "robin...@example.com"
const mask_email = (input) => {
    let splitted, avg, part1, part2
    splitted = input.split("@")
    part1 = splitted[0];
    avg = part1.length / 2
    part2 = splitted[1]
    
    return (part1.substring(0, avg) + "***" + part2)
}
console.log(mask_email("ryannesh2376@gmail.com"));
// 7. Parameterize String
// ○ Write a JavaScript function to parameterize a string.
// ○ Test Data:
// console.log(string_parameterize("Robin Singh from USA.")); //
// "robin-singh-from-usa"
const parameterized_str = (input) => {
    return(input.trim().toLowerCase().replace(/[^a-zA-Z0-9 -]/, "").replace(/\s/g, "-"))
}
console.log(parameterized_str("Robin Singh from USA"))
// 8. Capitalize First Letter
// ○ Write a JavaScript function to capitalize the first letter of a string.
// ○ Test Data:
// console.log(capitalize('js string exercises')); // "Js string exercises"
const initialize = (input) => {
    return (input.charAt(0).toUpperCase() + input.slice(1))
}
console.log(initialize("js string"))

// 9. Capitalize Each Word
// ○ Write a JavaScript function to capitalize the first letter of each word in a string.
// ○ Test Data:
// console.log(capitalize_Words('js string exercises')); // "Js String Exercises"
let capitalize_Words = (input) =>{
    return input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
// Call the capitalize_Words function with the argument 'js string exercises' and output the result
console.log(capitalize_Words('js string exercises'));
// 10. Swap Case
// ○ Write a JavaScript function that converts uppercase letters to lowercase and vice
// versa.
// ○ Test Data:
// console.log(swapcase('AaBbc')); // "aAbBC"
const swapcase = (str) => 
    str.split('').map(char => 
        char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
    ).join('');

console.log(swapcase('AaBbc')); // "aAbBC"

// 11. Camelize String
// ○ Write a JavaScript function to convert a string into camel case.
// ○ Test Data:
// console.log(camelize("JavaScript Exercises")); // "JavaScriptExercises"
const camelize = (str) => str.replace(/\s+(.)/g, (_, char) => char.toUpperCase());

console.log(camelize("JavaScript Exercises")); // "JavaScriptExercises"

// 12. Uncamelize String
// ○ Write a JavaScript function to uncamelize a string.
// Test Data:
// console.log(uncamelize('helloWorld')); // "hello world"
// ○ console.log(uncamelize('helloWorld','-')); // "hello-world"
const uncamelize = (str, separator = ' ') => 
    str.replace(/([a-z])([A-Z])/g, `$1${separator}$2`).toLowerCase();

console.log(uncamelize('helloWorld')); // "hello world"
console.log(uncamelize('helloWorld', '-')); // "hello-world"

// 13. Repeat String
// ○ Write a JavaScript function to concatenate a given string n times.
// ○ Test Data:
// console.log(repeat('Ha!', 3)); // "Ha!Ha!Ha!"
const repeat = (str, n) => str.repeat(n);

console.log(repeat('Ha!', 3)); // "Ha!Ha!Ha!"

// 14. Insert in String
// ○ Write a JavaScript function to insert a string within another string at a given
// position.
// Test Data:
// console.log(insert('We are doing some exercises.', 'JavaScript ', 18));
// ○ // "We are doing some JavaScript exercises."
const insert = (str, insertStr, position) => 
    str.slice(0, position) + insertStr + str.slice(position);

console.log(insert('We are doing some exercises.', 'JavaScript ', 18));
// "We are doing some JavaScript exercises."

// 15. Humanize Format
// ○ Write a JavaScript function that formats a number with the correct suffix (1st,
// 2nd, etc.).
// ○ Test Data:
// console.log(humanize_format(301)); // "301st"
const humanize_format = (num) => {
    if (num % 100 >= 11 && num % 100 <= 13) return num + 'th';
    let suffixes = ['th', 'st', 'nd', 'rd'];
    let remainder = num % 10;
    return num + (suffixes[remainder] || 'th');
};

console.log(humanize_format(301)); // "301st"

// 16. Truncate String with Ellipsis
// ○ Write a JavaScript function to truncate a string and append "...".
// Test Data:
// console.log(text_truncate('We are doing JS string exercises.', 15, '!!'));
// ○ // "We are doing !!"
const text_truncate = (str, length, ending = "...") => 
    str.length > length ? str.slice(0, length) + ending : str;

console.log(text_truncate('We are doing JS string exercises.', 15, '!!'));
// "We are doing !!"

// 17. Chop String into Chunks
// ○ Write a JavaScript function to chop a string into chunks.
// ○ Test Data:
// console.log(string_chop('w3resource', 3)); // ["w3r", "eso", "urc", "e"]
const string_chop = (str, size) => {
    let result = [];
    for (let i = 0; i < str.length; i += size) {
        result.push(str.slice(i, i + size));
    }
    return result;
};

console.log(string_chop('w3resource', 3)); // ["w3r", "eso", "urc", "e"]

// 18. Count Substring Occurrences
// ○ Write a JavaScript function to count occurrences of a substring in a string.
// Test Data:
// console.log(count("The quick brown fox jumps over the lazy dog", 'the'));
// ○ // Output: 2
const count = (str, sub) => 
    (str.match(new RegExp(sub, "gi")) || []).length;

console.log(count("The quick brown fox jumps over the lazy dog", 'the')); 
// Output: 2

// 19. Reverse Binary Representation
// ○ Write a JavaScript function that reverses the binary representation of a number
// and returns its decimal form.
// ○ Test Data:
// console.log(reverse_binary(100)); // 19
const reverse_binary = (num) => 
    parseInt(num.toString(2).split('').reverse().join(''), 2);

console.log(reverse_binary(100)); // 19

// 20. Pad String to Length
// ○ Write a JavaScript function to pad a string to a specified length.
// ○ Test Data:
// console.log(formatted_string('0000', 123, 'l')); // "0123"
const formatted_string = (pad, str, dir) => 
    dir === 'l' ? (pad + str).slice(-pad.length) : (str + pad).slice(0, pad.length);

console.log(formatted_string('0000', 123, 'l')); // "0123"
