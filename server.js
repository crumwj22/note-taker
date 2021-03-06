const express = require("express");
const path = require("path");
const fs = require("fs");

// method for generating unique ids
const uuid = require("uuid");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// GET request for notes, display note
app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    notes = JSON.parse(data);
    console.log(notes);
    res.json(notes);
  });
});

// POST request to add a note, new note
app.post("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    const newNote = req.body;
    const notes = JSON.parse(data);
    newNote.id = uuid.v4();
    notes.push(newNote);

    // fs.writeFile("./develop/db/db.json", (err, data) => JSON.stringify(notes));
    fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
      if (err) {
        console.error(err);
      }
      // file written successfully
    });
    res.json(newNote);
  });
});

// DELETE request, delete saved note
app.delete("/api/notes/:id", (req, res) => {
  const deleteId = req.params.id;
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    const notes = JSON.parse(data);
    const newNoteData = notes.filter((item) => {
      return item.id !== deleteId;
    });

    fs.writeFile("./db/db.json", JSON.stringify(newNoteData), (err) => {
      if (err) {
        console.error(err);
      }
      // file written successfully
    });
    res.json(newNoteData);
  });
});

//static middleware
app.use(express.static("public"));

// HTML routes
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// listening
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
