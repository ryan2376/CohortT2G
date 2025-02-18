// using promise to fetch data
const promise = fetch('https://jsonplaceholder.typicode.com/todos/1')
// resolve with promise
promise.then((response) => response.json())
        .then((jsonData) => console.log(jsonData));


// using async await to fetch 
async function fetchData() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/4')
        const dataJson = await response.json()
        console.log(dataJson);
    } catch (error) {
        console.log(error.message);
    }
}
fetchData()