const express = require("express");
const path = require("path");
const fs = require("fs");
// const util = require("util");

// method for generating unique ids
const uuid = require("uuid");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//static middleware
app.use(express.static("./develope/public"));

// GET request for notes
app.get("/api/notes", (req, res) => {
  fs.readFile("./develop/db/db.json", "utf8", (err, data) => {
    notes = JSON.parse(data);
    res.json(notes);
  });
});

// POST request to add a note
app.post("/api/notes", (req, res) => {
  fs.readFile("./develop/db/db.json", "utf8", (err, data) => {
    const newNote = req.body;
    const notes = JSON.parse(data);
    newNote.id = uuid.v4();
    notes.push(newNote);

    fs.writeFile("./develop/db/db.json", JSON.stringify(notes));
    res.json(newNote);
  });
});

// delete request
app.delete("/api/notes/:id", (req, res) => {
  const deleteId = req.params.id;
  fs.readFile("./develop/db/db.json", "utf8", (err, data) => {
    const notes = JSON.parse(data);
    const newNoteData = notes.filter((item) => {
      return item.id !== deleteId;
    });

    fs.writeFile("./develop/db/db.json", JSON.stringify(notes));
    res.json(newNoteData);
  });
});

// HTML routes
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./develop/public/notes.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./develop/public/index.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./develop/public/index.html"));
});

// listening
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
