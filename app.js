const express = require("express");
const app = express();
const fs = require("fs")

app.set("view engine","ejs");

app.get("/", (req, res) => {

    fs.readdir(`./uploads`, (err, files) =>{
        res.render("index", {files})
    })
    
});

app.get("/new", (req, res) => {
    res.render("new")
})

app.get("/note-create", (req, res) => {
    fs.writeFile(`./uploads/${req.query.title}.txt`, req.query.content, (err) => {
        if(err) throw err;
        else res.redirect("/");
    })
})

app.get("/content/:filename", (req, res) => {

    let filename = req.params.filename
    fs.readFile(`./uploads/${filename}`, 'utf-8', (err, data) => {
        if(err) throw err;
        else res.send(data);
    })
})

app.get("/delete/:filename", (req, res) => {
    let filename = req.params.filename

    fs.unlink(`./uploads/${filename}`,(err) => {
        if(err) throw err;
        else res.redirect("/")
    })
})

app.get("/edit/:filename", async (req, res) => {
    const filename = req.params.filename
    fs.readFile(`./uploads/${filename}`, "utf-8", (err, data) => {
      
       res.render("edit",{data, filename})
    })
})

app.get("/edit-note/:oldfilename", (req, res) => {
    const oldfilename = req.params.oldfilename
    const newfilename = req.query.title
    const content = req.query.content


    fs.rename(`./uploads/${oldfilename}`, `./uploads/${newfilename}`, (err) => {
        fs.writeFile(`./uploads/${newfilename}`, content, (err) =>{
            res.redirect("/")
        })
    })
})


app.listen(3000);