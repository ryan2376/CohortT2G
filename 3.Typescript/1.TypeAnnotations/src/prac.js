"use strict";
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
//     type test = Expect<Equal<typeof result, string>>;
//     expect(result).toEqual("John Pocock");
// });
