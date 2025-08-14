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
    res.send("get request successfull");
})






app.listen(port, (req, res) => {
    console.log(`listening at port ${port}`);
});