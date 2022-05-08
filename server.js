const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//static middleware
app.use(express.static("./develope/public"));

// GET request for notes
app.get("/api/notes", (req, res) => {
  readFile("./develop/db/db.json", "utf8", (err, data) => {
    notes = [].concat(JSON.parse(data));
    res.json(notes);
  });
});

// POST request to add a note
app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  readFile("./develop/db/db.json", "utf8", (err, data) => {
    const notes = [].concat(JSON.parse(data));
    newNote.id = notes.length + 1;
    notes.push(newNote);
    return notes;
  }).then(function (notes) {
    writeFile("./develop/db/db.json", JSON.stringify(notes));
    res.json(newNote);
  });
});
// delete request
app.delete("/api/notes/:id", (req, res) => {
  const deleteId = parseInt(req.params.id);
  readFile("./develop/db/db.json", "utf8", (err, data) => {
    const notes = [].concat(JSON.parse(data));
    const newNoteData = [];
    for (let i = 0; i < notes.length; i++) {
      if (deleteId !== notes[i].id) {
        newNoteData.push(notes[i]);
      }
    }
    return newNoteData;
  }).then(function (notes) {
    writeFile("./develop/db/db.json", JSON.stringify(notes));
    res.send("saved successfully!");
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
