const express = require('express')

const app = express()

app.get('/',(req,res)=>{
    res.send("Hello World")
})

// function delayop(duration){
//     return new Promise((resolve,reject)=>{
//         setTimeout(()=>{
//             resolve(`ran after ${duration} milliseconds`)
//         },duration)
//     })
// }

// delayop(2000)
// .then((res)=>console.log(res))
// .catch((err)=> console.error(err.message))




// Async/Await

// async function delayop(){
//     const res = await fetch('https://api.adviceslip.com/advice')
//     const val = await res.json()
//     console.log(val)
// }

// delayop()





app.listen(3000)