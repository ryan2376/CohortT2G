//when comapring values the || and && operators come in handy
//we also use the == or === for equality
let result = '2' || '3' || 'Alamin'
if(result == '2'|| result == '3' || result == "Alamin"){
    console.log("available")
}
else{
    console.log("unavailable")
}

//logical &&

let result1 = '2' && '3' && 'Alamin'
if(result1 == '2' && result1 == '3' && result1 == 'Alamin'){
    console.log("available")
}
else{
    console.log("unavailable")
}

let user = {isLoggedIn: true, hasPermission: true}
if(user.isLoggedIn && user.hasPermission){
    console.log("view bank balance")
}

let isActive = false
if(!isActive){
    console.log("user is inactive")
}else{
    console.log("user is active")
}

let d = true
let e = false
let _result = !d && (e || true)
console.log(result)

// in react we use logical rendering using logical operators
//conditional rendering in react
// return(
//     <div>
//         {isUser}
//     </div>
// )