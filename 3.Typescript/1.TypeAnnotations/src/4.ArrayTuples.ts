// square brackets syntax
//  let variableName: type[] = [] -where the type can be anytype
// type Book = {
//     title: string,
//     author: string,
//     price: number,
// }

// let books: Book[] = []

// array of numbers
const myAlbums = ["Rubber Soul", "Revolver"]
let albums = myAlbums


// let variableName: ArrayType> = ArrayValue
type BookType = {
    title: string,
    author: string,
    price: number,
}
let albumsArray: Array<string> = myAlbums

// array of numbers
let marksArr: Array<number> = [12, 45, 6767, 443]

type Album = {
    artist: string,
    title: string,
    year: number,
}

// let albumsObj: Array<Album> = [
//     {title: "Rubber Soul", author: "The Beatles", price: 19.99},
//     {title: "Revolver", author: "The Beatles", price: 14.99},
// ]

// let myAlbumsSong : Album[] = [];


// Tuples - immutable data structure
// array of related types
// useful for grouping related info together without having to create a new type
// let variableName: [type1, type2][data1, data2]
let albumWithPlayCount: [Album, number] = [
    {
        artist: "The Beatles",
        title: "Rubber Soul",
        year: 1999,
    }, 100000
];

// naming tuples makes it easier to understand their types
type MyTuple = [album: Album, playCount: number]
let albumWithPlayCount1: MyTuple = [
    {
        artist: "The Beatles",
        title: "Rubber Soul",
        year: 1999,
    }, 100000
]

// items:Array<strings>
type Ingredient = {
        name: string,
        quantity: string,
    }

type Recipe = {
    title: string;
    ingredients: Ingredient[];
    instructions: string;
};


const processRecipe = (recipe: Recipe) => {
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

