// filter method creates a new array with all elements that pass the test
// must have a return keyword or return immediate

// callback fxn = fxn that will be executed on each element of the array () => () //calls itself

// arrayName.filter((value, index, array) => {
    // fxn body
    // })
    // Array.filter(callbackFxn, thisArg)
    // Returns a new Array
    // Requires return - ommitting this will lead into an empty array
    // immutability- does not alter the original array, ensuring that the original data remains unchanged

    const availableFoods = [
        {id:"343434", name: "Apple", price: 2, img: "🍎"},
        {id:"34343", name: "Banana", price: 1, img: "🍌"},
        {id:"367834", name: "Orange", price: 3, img: "🍊"},
        {id:"3409834", name: "Pear", price: 4, img: "🍐"}
    ]

    const filteredFoods = availableFoods.filter((value) => console.log(value))
    const priceFoods = availableFoods.filter((filteredFoodObject) => console.log(filteredFoodObject.price<3))

    let pricy = availableFoods.filter