const socialDash = [
    {id: '1111', name:"Alex", location:"Nakuru", friends:['999','888'], posts:[{content:"cat", timestamp:"14022025", likes:20}]},
    {id: '2222', name:"Emma", location:"Nairobi", friends:['777','666'], posts:[{content:"dog", timestamp:"29012025", likes:60}]},
    {id: '3333', name:"Naph", location:"Nyeri", friends:['555','444'], posts:[{content:"lion", timestamp:"09022025", likes:4}]},
    {id: '4444', name:"Pesh", location:"Meru", friends:['333','222'], posts:[{content:"cow", timestamp:"19012025", likes:100}]}
]


const filteredUsers = socialDash.filter((value) => value)
const postedLatest = socialDash.filter((latestPost) => latestPost.friends)
console.log(postedLatest)