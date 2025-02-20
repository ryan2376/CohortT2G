let showering = true;
if(showering){
    console.log("showering is good")
}

// multiple fallbacks

let marks = 0
let grade = ''

function myGrade(mark) {
    if(mark > 89){
        grade = 'A'
    }else if(mark > 70) {
        grade = 'B'
    }else if(mark > 50){
        grade = 'C'
    }else if(mark > 30){
        grade = 'D'
    }else{
        grade = 'E'
    }
    return grade
}
//ES6 syntax comparison
// let functionName = condition ? executedThis1: (else) executedThis2

const myGrade1 = (mark) => {
    return  mark>100 ? 'Invalid':
            mark>=100 ? 'A' :
            mark>=70 ? 'B' :
            mark>=50 ? 'C' :
            mark>=30 ? 'D' :
            'E' //else block
}
console.log(myGrade1(103))
console.log(myGrade1(50))