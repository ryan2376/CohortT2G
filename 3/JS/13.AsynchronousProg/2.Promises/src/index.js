// the code is working but its leading to unreadable code
// this leads to a callback hell pyramid
// to solve this we use Promises


// A promise can be in one of three states

// pending: initial state, neither fulfilled nor rejected

// fulfilled: meaning the operation completed successfully

// rejected: meaning the operation failed

// syntax

new Promise((resolve, reject) => {}) //pending state

let promise = new Promise((resolve, reject) =>{
        if (Promise.resolve){
                resolve('I am fulfilled');
        }else{
                reject('Error message');
        }
})
console.log(promise);

// consuming a promise is done using the .then() and .catch() methods, which allow you to define how to handle success and failure, respectively

promise.then((result) => {
        console.log(result);
}).catch((error) => {
        console.log(error);
})

