// accessing array indices

const nums = [4, 1, 2, 3, 5];

// let sorted = nums.sort()
console.log(nums.sort());
// console.log(array[0]); // prints 1
// console.log(array[array.length - 1]); // prints 5

// access modifiers arrays
// console.log(array[0])

// // arrays are passed by reference not by value
// // meaning we can change the value of a const
// const fullName = ['Ali', 'nesh']

// fullName[0] = 'Ahmad'

// console.log(fullName) // prints ['Ahmad', 'nesh']

// // modificaton in arrays
// const marks = [23, 45, 67, 89]

// let marksAtIndex2 = marks[2]
// marksAtIndex2 = 20
// console.log(marksAtIndex2)
// console.log(marks)

// // .push method used to add elements to the end of an array
// let denisInfo = []
// denisInfo.push(23)
// console.log(`Denis info:`, denisInfo)
// denisInfo.push({idNumber: 282828, country: 'Kenya'})
// console.log(`Denis info:`, denisInfo)

// // .pop method used to remove the last element from an array
// console.log(denisInfo.pop())

// // shift() method used to remove the first element
// console.log(denisInfo.shift())

// // indexOf() method used to get the position of a particular value
// const cowInfo =['Fresian', 'Brown', 150]
// // indexOf expects you to pass an index
// console.log(cowInfo.indexOf())
// console.log(cowInfo.indexOf("Fresian"))

// // concat() method used to merge two arrays

// const markMaingi = ['Mark', 211212]
// const stanMahihu = ['Stanley', 2324]
// const combinedArray = markMaingi.concat(stanMahihu)
// console.log(combinedArray)
// console.log(combinedArray[3])

// // joining array elements into one string we use join()
// const months = ['January','February','March','April']
// console.log(months.join())

// // join with no commas
// console.log(months.join(""))

// // join with space

// console.log(months.join(" "))

// //splice used to remove,replace or add elements
// //arrayName.splice(indexPosition, numberOfItemsBeingReplaced, 'Value')


// const siz = ['Felistus', 'Nelly', 'Pearl']
// console.log(siz)
// // siz.splice(1, 0, 'Fatma')
// // console.log(siz)

// siz.splice(1, 2, 'Najma', 'Jane')
// console.log(siz)
// // removes the first item automatically
// // console.log(siz.splice(1))


// // slice creates a shallow copy of a portion of an array
// // slice returns an array from the starting index to the indexprovided minus one
// const broz = ['Mark', 'Allan', 'Ryan', 'Stano']
// console.log(broz.slice(1, 3))

// // includes() checks if an array contains a specific value
// console.log(broz.includes('Max'))
