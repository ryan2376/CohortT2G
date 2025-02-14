// forEach is used to execute a provided function once for each element in an array
// iterates through each element of the arrayand performs a given operation
// no return value
// it is mutable- modifies the original array

// arrayName.forEach(callbackFxn)
// callbackFxn - (value)= {} //no return value
// callbackFxn - (value)= { return value } //with return value

// in ES6, callbackFxn - (value) => (value) with return directly

let runners = ['Kiprotich', 'Kiprop', 'Kosgei']
runners.forEach((runner) => {
    // iterates over each element and performs a given oper
    console.log(`${runner}`)
})

let marks = [23, 56, 78, 90, 100]

const avg = marks.forEach((singleMark) => {
    let total = 0
    total += singleMark
    console.log(total)
    console.log(`Average is:  ${total / marks.length}`) 
})
