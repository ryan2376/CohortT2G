// .map method creates a new array populated with the results of caliing a provided fxn on every element


const inititialFoodPrices = [
    {id:"343434", name: "Apple", price: 2, img: "🍎"},
    {id:"34343", name: "Banana", price: 1, img: "🍌"},
    {id:"367834", name: "Orange", price: 3, img: "🍊"},
    {id:"3409834", name: "Pear", price: 4, img: "🍐"}
]

const newFoodArrays = inititialFoodPrices.map((foodObj) => {
    return foodObj
})

console.log(newFoodArrays)

let newFoodPrice = inititialFoodPrices.map((foodObj) => {
    return foodObj.price + 100
})

console.log(newFoodPrice)
