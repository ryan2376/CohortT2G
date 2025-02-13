// a data structure is anything that holds data in a certain structure
//object - holds data in form of key, value pairs

let myObject = {}
console.log(typeof myObject)

// add data to an object
// . Notation = objectName.key = value

myObject.firstName = "John"
myObject.secondName = "Njunguna"
myObject.marks = [200, 45, 1900]
myObject.info = {idNum: 233233,
                country: "Kenya"
                }

console.log(myObject)

// objects can contain different types of data types
const Bruno = {
    name: "Messi",
    age: 38,
    club: "Inter Miami",
}
console.log(Bruno)

//access modifiers in objects
// 1.dot notation 
// 2. index string type
// 3. using object.keys 
// 4.destructuring
// 5. using this keyword

// 1 dot notation
console.log(Bruno.age)

// 2 index string type - pass in a key as a string inside []
//objectName["keyName"]
console.log(Bruno["club"])

// 3 using object.keys
//Object.keys(objectName)
console.log(Object.keys(Bruno))

// Access the Age key
console.log(Object.keys(Bruno)[2])

console.log(Bruno[Object.keys(Bruno)[1]])

// 5 using this keyword
// this keyword is used to refer to the current context

const myInfo = {
    name: "Emma",
    age: 28,
    hobby: ['reading', 'writing'],
    isMarried: false,
    meanGrade: function grades() {
        return `Your mean grade is: ${this.meanGrade}`
    },
    keyFn: function(n) {
        //objectName[Object.keys(objectName)[index]]
        return this[Object.keys(this)[n]]
    }
}
console.log(myInfo.keyFn(1))

// parse JSON

// we can use JSON.stringify() which converts a javascript object into a string
