"use strict";
// square brackets syntax
//  let variableName: type[] = [] -where the type can be anytype
// type Book = {
//     title: string,
//     author: string,
//     price: number,
// }
// let books: Book[] = []
// array of numbers
const myAlbums = ["Rubber Soul", "Revolver"];
let albums = myAlbums;
let albumsArray = myAlbums;
// array of numbers
let marksArr = [12, 45, 6767, 443];
// let albumsObj: Array<Album> = [
//     {title: "Rubber Soul", author: "The Beatles", price: 19.99},
//     {title: "Revolver", author: "The Beatles", price: 14.99},
// ]
// let myAlbumsSong : Album[] = [];
// Tuples - immutable data structure
// array of related types
// useful for grouping related info together without having to create a new type
// let variableName: [type1, type2][data1, data2]
let albumWithPlayCount = [
    {
        artist: "The Beatles",
        title: "Rubber Soul",
        year: 1999,
    }, 100000
];
let albumWithPlayCount1 = [
    {
        artist: "The Beatles",
        title: "Rubber Soul",
        year: 1999,
    }, 100000
];
const processRecipe = (recipe) => {
    // Do something with the recipe in here
};
processRecipe({
    title: "Chocolate Chip Cookies",
    ingredients: [
        { name: "Flour", quantity: "2 cups" },
        { name: "Sugar", quantity: "1 cup" },
    ],
    instructions: "...",
});
