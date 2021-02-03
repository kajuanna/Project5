//Require express
const { request, response } = require("express");
const express = require("express");
const data = require("./data.json");

const app = express();
//Middleware setup using pug
app.set("view engine", "pug");
app.use("/static", express.static("public"));
//Setting routes
app.get("/", (req, res) => {
  res.locals.projects = data.projects;
  res.render("index");
});
//Request the about page
app.get("/about", (req, res) => {
  res.render("about");
});
//Requesting the routes
app.get("/projects/:id", (req, res, next) => {
  let id = req.params.id;
  let projData;
  data.projects.forEach((project) => {
    if (id == project.id) {
      projData = project;
    }
  });
  if (projData) {
    res.locals.project = projData;
    res.render("project");
  } else {
    next();
  }
});
//Handle errors
app.use((req, res, next) => {
  const err = new Error("Page Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render("error");
});
//Port the app is listening to
app.listen(3000, () => {
  console.log("Example app listening at http://localhost:3000");
});
