// a callback

function addCallBack(z, callbackfn) {
        return callbackfn(z, 6)
}


function add(a, b) {
        return a + b
}

console.log(addCallBack(10, add));


// login to netflix

function loginUser (email, password, callbackfn) {
        setTimeout(() => {
        console.log("We are logging into Netflix");
                callbackfn({userEmail:email, userPassword:password})
        }, 3000)
}

// get all videos
function getAllVideos({userEmail}, callbackfn) {
        setTimeout(() => {
        console.log("We are getting all recently watched videos");
        callbackfn({userEmail, videoInfo: ["Star wars","The Mando"]})
        },3000)
}

function getVideoInfo(videoInfoObj, callbackfn) {
        setTimeout(() => {
                console.log("We have the details of one video");
                callbackfn({video: videoInfoObj.videoInfo[1]})
        },3000)
}

loginUser("user@example.com", "password123", (userObj) => {
        console.log(userObj);

//  this is a single thread and we need to tap into it and get the value to be passed by the callback 
        getAllVideos(userObj, (videoObj) => {
                console.log(videoObj);
                getVideoInfo(videoObj, (videoInfoObj) => {// to get details of mando we need to be inside the thread of getAllVideos
                        console.log(videoInfoObj);
                })
        })
})

// the code is working but its leading to unreadable code
// this leads to a callback hell pyramid
// to solve this we use Promises
