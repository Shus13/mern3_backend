require('dotenv').config()
const express = require('express')
const connectDatabase = require('./database')
const Blog = require('./model/blogModel')
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

    const {title, subtitle, description, image} = req.body

    Blog.create({
        title : title, 
        subtitle : subtitle,
        description : description,
        image : image
    })

    res.status(201).json({
        message: "Blog api hit successfully"
    })
})

app.listen(process.env.PORT, () => {
    console.log("Node server has started")
})