// trad way of async programming 
// function downloadFile(url, callback) {
//     console.log(`Downloading file from ${url}`)
//     setTimeout(() => {
//         console.log("Downloading file...");
//         callback(url)
//     },3000)
// }

// function successMsg(url) {
//     console.log(`Download successfull from ${url}`);
// }

// downloadFile("www.rttr.com", successMsg)

function downloadFile(url) {
    return new Promise((resolve, reject) => {
        console.log(`Downloading file from ${url}`)
        setTimeout(() => {
            let success = true
            if (success) {
                resolve(`Download successful from ${url}`)
            } else {
                reject(`Download error`)
            }
        }, 3000)
    })
}
// downloadFile("www.rttr.com")
//     .then((data) => console.log(data))
//     .catch((error) => console.log(error))
async function displayData() {
    try {
        const data = await downloadFile("www.rttr.com")
        console.log(data)
    } catch (error) {
        console.log(error)
    }

}

displayData()