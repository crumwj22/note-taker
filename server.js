const express = require("express");
const path = require("path");
const fs = require("fs");

const uuid = require("./helpers/uuid");

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// GET request for notes
app.get("/api/notes", (req, res) => {
  res.json(database);
});

// POST request to add a note
app.post("/api/notes", (req, res) => {
  
  let newNote = req.body;
  notes.push(newNote);
  updateDb();
  return console.log("added new note: "+newNote.title)
});

app.get("/api/notes/:id",  (req, res) => {
res.json(notes[req.params.id])
});

    // Obtain existing notes
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // Convert string into JSON object
        const notes = JSON.parse(data);

        // Add a new note
        notes.push(newNote);

        // Write updated reviews back to the file
   
      }
    });

function updateDb()
     fs.writeFile(
          "./db/db.json",
          JSON.stringify(notes, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info("Successfully updated notes!")
        );

    
function deleteNote(id, notesArray) {
    for (let i = 0; i < notesArray.length; i++) {
        let note = notesArray[i];

        if (note.id == id) {
            notesArray.splice(i, 1);
            fs.writeFileSync(
                path.join(__dirname, `./db/db.json`),
                JSON.stringify(notesArray, null, 2)
            );
            break;
        }
    }
}

app.delete('/api/notes/:id', (req, res) => {
    deleteNote(req.params.id, allNotes);
    res.json(true);
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
