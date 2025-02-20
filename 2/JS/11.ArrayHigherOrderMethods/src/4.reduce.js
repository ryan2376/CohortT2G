// reduce method is used in applying a fxn to each element of an array, reducing the array to a single value
//useful  for accumulating results 

const inititialFoodPrices = [
    {id:"343434", name: "Apple", price: 200, img: "🍎"},
    {id:"34343", name: "Banana", price: 167, img: "🍌"},
    {id:"367834", name: "Orange", price: 365, img: "🍊"},
    {id:"3409834", name: "Pear", price: 450, img: "🍐"}
]

const newFoodArrays = inititialFoodPrices.map((foodObj) => {
    return foodObj.price + 100
})

console.log(newFoodArrays)

const totalPrice = newFoodArrays.reduce((acc, price) => {
    return acc + price
})

console.log(totalPrice)

let totalBill = inititialFoodPrices.map((foodObj) => foodObj.price).reduce((acc, prices) => acc + prices)

console.log(totalBill)

