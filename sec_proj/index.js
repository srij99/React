const express = require('express')
const app = express()


app.get('/',(req,res)=>{
    res.send("Hello World")
})

 function f_function(){

    console.log('test')
    setTimeout(()=>{
        console.log('second function')
    },5000)
    
    console.log('first function')

}

f_function()


app.listen(3000)