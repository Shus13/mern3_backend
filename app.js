const express = require('express')
const app = express()

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


app.post("/post", (req, res) => {

    const { name, age } = req.body

    res.status(201).json({
        message: "User created successfully",
        name,
        age
    })
})

app.listen(3000, () => {
    console.log("Node server has started")
})