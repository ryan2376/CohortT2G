// async-await is an asynchronous execution flow where a promise is automatically fulfilled
// adding an async keyword before a function will return a new promise automatically
//  inside the async function we use await keyword to pause execution

async function add(x, y) {
                return x + y;
}

const addMarks = async () => { 
        console.log(`i am adding marks....`);
        const result = await add(7, 8)
        console.log(result);
};
addMarks()

