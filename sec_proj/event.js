const express = require('express')
const EventEmitter = require('events')
const app = express()
const event = new EventEmitter

let count = 0

event.on('Event1',()=>{
    count++;
    console.log('event called',count)
})

app.get('/',(req,res)=>{
    res.send("Hello World")
    event.emit("Event1")
})



app.listen(3000)