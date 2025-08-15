const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');
const { title } = require("process");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

//creating a arr of objects for the tasks
let tasks = [{
    id: uuidv4(),
    title: "to make breakfast",
    description: "bring eggs from the store",
}, {
    id: uuidv4(),
    title: "make a presentation",
    description: "do research",
}, {
    id: uuidv4(),
    title: "plan the weekend",
    description: "bucked list places to visit",
}, {
    id: uuidv4(),
    title: "prepare for exams",
    description: "gather question papers",
}];
app.get("/home", (req, res) => {
    res.render("home.ejs", { tasks });
});
app.post("/newtask", (req, res) => {
    let id = uuidv4();
    let { title, description } = req.body;
    tasks.push({ id, title, description });
    console.log(tasks);
    res.redirect("/home");
});
app.get("/home/newtask", (req, res) => {
    res.render("newtask.ejs");
});
app.patch("/home/:id", (req, res) => {
    let { id } = req.params;
    let task = tasks.find((t) => (id == t.id));
    task.title = req.body.title;
    task.description = req.body.description;
    res.redirect("/home");

})
app.get("/home/:id/edit", (req, res) => {
    let { id } = req.params;
    let task = tasks.find((t) => (id == t.id));
    console.log(task);
    res.render("edit.ejs", { task });
});
app.delete("/home/:id", (req, res) => {
    let { id } = req.params;
    tasks = tasks.filter((t) => (id != t.id));
    res.redirect("/home");
})
app.listen(port, (req, res) => {
    console.log(`listening at port ${port}`);
});