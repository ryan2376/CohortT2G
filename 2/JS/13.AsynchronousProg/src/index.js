function connectDB() {
    
}

// function fetchData() {
//     connectDB(mongoDBInstance);
//     // fetch data
// }

// synchronous prog is Blocking while asynchronous programming is non-blocking as it lets other operations run while waiting for a task to complete eg fetching data from a server without freezing the rest of your application

async function fetchData() {
        connectDB(mongoDBInstance);
        // fetch data
}
    

// handling Asychronous operations
console.log("hello there");

// callbacks 

// promises 

//  Async/Await