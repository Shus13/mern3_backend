require("dotenv").config();
const express = require("express");
const connectDatabase = require("./database");
const Blog = require("./model/blogModel");
const app = express();
app.use(express.json());

const { multer, storage } = require("./middleware/multerConfig");
const upload = multer({ storage: storage });
const fs = require('fs')

connectDatabase();

app.post("/blog", upload.single("image"), async (req, res) => {
  const { title, subtitle, description, image } = req.body;
  const filename = req.file.filename;

  if (!title || !description || !subtitle) {
    return res.status(400).json({
      message: "Please provide title, description, subtitle",
    });
  }

  await Blog.create({
    title: title,
    subtitle: subtitle,
    description: description,
    image: filename,
  });

  res.status(201).json({
    message: "Blog api hit successfully",
  });
});

app.get("/blog", async (req, res) => {
  const blogs = await Blog.find();

  res.status(200).json({
    message: "Blogs fetched successfully",
    data: blogs,
  });
});

app.get("/blog/:id", async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findById(id);
  if (!blog) {
    return res.status(400).json({
      message: "No data found",
    });
  }
  res.status(200).json({
    message: "Fetched successfully",
    data: blog,
  });
});

app.delete("/blog/:id", async (req, res) => {
    const id = req.params.id
    const blog = await Blog.findById(id)
    const imageName = blog.image
    fs.unlink(`storage/${imageName}` , (err) => {
        if(err){
            console.log(err)
        }else{
            console.log("File deleted successfully")
        }
    })

    await Blog.findByIdAndDelete(id)
    res.status(200).json({
        message : "Blog deleted successfully"
    })
})

app.patch("/blog/:id", async (req, res) => {
    const id = req.params.id
    const {title, subtitle, description} = req.body

    await Blog.findByIdAndUpdate(id, {
        title: title,
        subtitle: subtitle,
        description: description
    })
    res.status(200).json({
        message : "Updated successfully"
    })
})

app.use(express.static("./storage"));

app.listen(process.env.PORT, () => {
  console.log("Node server has started");
});
