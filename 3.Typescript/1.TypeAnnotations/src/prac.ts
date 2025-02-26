
// // optional parameters

// // const concatName1 = (first: string, last?: string) => {
// //     if (!last) {
// //         return first;
// //     }

// //     return `${first} ${last}`;
// // };

// // const results = concatName1("Ryan")
// // console.log(results);

// // def function parameters

// const concatName1 = (first: string, last?: string) => {
//     if (!last) {
//         return first;
//     }

//     return `${first} ${last}`;
// };

// type it = {
//     first: string,
//     last: string
// }

// it ("should return the full name", () => {
//     const result = concatName("John", "Doe");

//     type test = Expect<Equal<typeof result, string>>;

//     expect(result).toEqual("John Doe");
// });

// it("should return the first name", () => {
//     const result = concatName("John");


//     expect(result).toEqual("John Pocock");
// });

// 1.
function getUsername(username: string | null) {
    if (username !== null) {
        return `User: ${username}`
    } else {
        return 'Guest'
    }
}

const result = getUsername('Alice')
console.log(result);
const result2 = getUsername(null)
// Argument of type 'null' is not assignable to parameter of type 'string'.

console.log(result2);

// 2.

type Direction = "up" | "down" | "left" | "right"

function move(direction: Direction, distance: number) {
    return `You moved ${distance}km to ${direction} direction`
}

console.log(move("up", 10))


// 3.
function validateUsername(username: string | null): boolean {
    return username.length > 5
    // 'username' is possibly 'null'.

    return false
}

validateUsername("")