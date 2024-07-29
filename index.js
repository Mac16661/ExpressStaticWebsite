import express from "express";
import favicon from "serve-favicon";
const path = require("path");
import data from "./data/data.json";

const app = express();
const PORT = 3000;

//TODO: adding middleware functions to serve static files path= /file_name
app.use(express.static("public"));

//TODO: method to use JSON
// app.use(express.json());

//TODO: url encoded
app.use(express.urlencoded({ extended: true }));

//TODO: this is for proxy
app.set("trust proxy", "loopback");

//TODO: serving static file from more then 1 file path= images/file_name

//TODO: app.use('route', express.static('folder_name'));
app.use("/images", express.static("images"));

//TODO: third party middleware function for serving fav icon(NOT WORKING RIGHT NOW)
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

app.get("/", (req, res) =>
  // res.send(`a get request with / route on port ${PORT}`)
  //TODO: sending json object as responce
  res.json(data)
);

app.post("/newItem", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

//TODO: query paramaters
app.get(
  "/item/:id",
  (req, res, next) => {
    //TODO: this is the middleware that pulls the data
    console.log(req.params.id);
    let user = Number(req.params.id);
    console.log(user);
    console.log(data[user]);
    //TODO: middleware that uses the req object
    console.log(`Request from: ${req.originalUrl}`);
    console.log(`Request type: ${req.method}`);
    // everything above is middleware
    res.send(data[user]);
    next(); //TODO: next function gonna call the function below;
  },
  (req, res) => {
    console.log("Did you get the right data");
  }
);

app.post("/newItem", (req, res) =>
  res.send(`a post request with /newItem route on port ${PORT}`)
);

app.get(
  "/images",
  (req, res) => res.download("images/1.jpg") //TODO: it will send file to the client
  // res.end() it end the responce
  // res.redirect("http://linkedin.com") //TODO: it redirects
);

//TODO: chaining or routing
app
  .route("/item")
  .get((req, res) => {
    // res.send(`a get request with /item route on port ${PORT}`);

    //It will throw an error
    throw new Error();
  })
  .put((req, res) => res.send(`a put request with /item route on port ${PORT}`))
  .delete((req, res) =>
    res.send(`a delete request with /item route on port ${PORT}`)
  );

//TODO: Error handling function(we can send html to the fronted)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(`Red alert! Red alert! :  ${err.stack}`);
});

app.listen(PORT, () => {
  console.log(`Your server is running on port ${PORT}`);
  console.log(data);
});
