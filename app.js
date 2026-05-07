require('dotenv').config()
const express = require('express')
const connectDatabase = require('./database')
const app = express()

connectDatabase()

app.use(express.json())

app.get("/", (req, res) => {
    res.json({ 
            message: "This is home page"
        })
})

app.get("/about", (req,res) => {
    res.json({
        message: "This is about page"
    })
})


app.post("/blog", (req, res) => {

    res.status(201).json({
        message: "Blog api hit successfully"
    })
})

app.listen(process.env.PORT, () => {
    console.log("Node server has started")
})