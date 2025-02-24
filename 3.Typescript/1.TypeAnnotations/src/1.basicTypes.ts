// Annotation is giving sth its own type
// we use : to annotate

let name1 = "Julia"

let name2: string = "Julia"
console.log(name2);

// function parameter annotations 

const logAlbumInfo = (title:string, trackCount:number, isReleased:boolean) => {
    return title
}

// declaring a variable
let car:string = "Ferrari"

let carTyres:number = 0
let example:null = null


// share types acroos different modules 
export type student = {
    name:string,
    age: number,
    grade: number,
}