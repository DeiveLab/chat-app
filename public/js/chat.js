const socket = io()

const $messageDisplay = document.querySelector('.message-display')
const $usersList  =document.querySelector('.list')


const {username, room} = Qs.parse(location.search, {ignoreQueryPrefix: true})

socket.on('message', (content) => {
    if(content.text){
        let timeStamp = document.createElement('span')
        timeStamp.innerHTML = `${content.createdAt}`
        timeStamp.classList.add('timeStamp')

        let messageSpan = document.createElement('span')
        let newMessage = document.createElement('div')
        let newMessageNick = document.createTextNode(`${content.username}: `)
        let newMessageText = document.createTextNode(`${content.text}`)
        messageSpan.appendChild(newMessageText)
        newMessage.appendChild(newMessageNick)
        newMessage.appendChild(messageSpan)
        newMessage.classList.add('message')
        messageSpan.classList.add('text-normal')
        newMessage.appendChild(timeStamp)
        $messageDisplay.appendChild(newMessage)
        $messageDisplay.scrollTop = $messageDisplay.scrollHeight;
    }
})

socket.on('roomData', ({room, users}) => {
    $usersList.innerHTML = ''
    let listRoom = document.createElement('h1')
    listRoom.innerHTML = room.toUpperCase()
    listRoom.classList.add('listRoom')
    $usersList.appendChild(listRoom)

    users.forEach(user => {
        let newUser = document.createElement('div')
        newUser.innerHTML = '&#183 ' + user.username
        newUser.classList.add('user')
        $usersList.appendChild(newUser)
    })
})


document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault()

    const message = e.target.elements.message.value

    socket.emit('sendMessage', message)

    e.target.elements.message.value = ''

    e.target.elements.message.focus()
})

socket.emit('join', {username, room}, (error) => {
    if(error){
        alert(error)
        location.href = '/'
    }
})

// document.querySelector('#send-location').addEventListener('click', () => {
//     if(!navigator.geolocation){
//         return alert('Geolocation is not supported by your browser')
//     }

//     navigator.geolocation.getCurrentPosition((position) => {
//         console.log(position)
//     })
// })