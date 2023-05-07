
const express = require ('express');

const app = express()

const port = process.env.PORT ||3000

require('./db/mongoose')

app.use(express.json())

const userRouter = require('./router/user')
app.use(userRouter)


app.listen(port , ()=>{console.log('all perfect');})