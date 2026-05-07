require('dotenv').config()
const express = require('express')
const connectDatabase = require('./database')
const Blog = require('./model/blogModel')
const app = express()
app.use(express.json())

const {multer, storage} = require('./middleware/multerConfig')
const upload = multer({storage : storage})

connectDatabase()


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


app.post("/blog",upload.single('image'), async (req, res) => {

    const {title, subtitle, description, image} = req.body

    if(!title || !description || !subtitle) {
        return res.status(400).json ({
            message : "Please provide title, description, subtitle, image"
        })
    }

    await Blog.create({
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