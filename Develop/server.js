const bodyParser = require('body-parser')
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const jsonParser =bodyParser.json()

deleteApiNotes = (req, res) => {
    const id = parseInt(req.params.id);

    // Read and parse the database
    const dbFilepath = path.join(__dirname, 'db', 'db.json');
    const text = fs.readFileSync(dbFilepath).toString();
    const notes = JSON.parse(text);
    const keepers = [];

    for (let i = 0; i < notes.length; i++) {
        const note = notes[i];
        console.log(JSON.stringify(note));
        if (note.id !== id) {
            keepers.push(note);
            console.log('push');
        } else {
            console.log('dont push');
        }
    }

    // write the updated database to the filesystem
    fs.writeFileSync(dbFilepath, JSON.stringify(keepers, null, 4));

    res.status(200);
    res.end();
}

const getApiNotes = (req, res) => {
    const dbFilepath = path.join(__dirname, 'db', 'db.json');
    res.sendFile(dbFilepath);
}

const getCSS = (req, res) => {
    const cssFilepath = path.join(__dirname, 'public', 'assets', 'css', 'styles.css');
    res.setHeader('content-type', 'text/css');
    res.sendFile(cssFilepath);
}

const getJS = (req, res) => {
    const jsFilepath = path.join(__dirname, 'public', 'assets', 'js', 'index.js');
    res.setHeader('content-type', 'text/javascript');
    res.sendFile(jsFilepath);
}

const getIndex = (req, res) => {
    const indexFilepath = path.join(__dirname, 'public', 'index.html');
    res.setHeader('content-type', 'text/html');
    res.sendFile(indexFilepath);
}

const getNotes = (req, res) => {
    const notesFilepath = path.join(__dirname, 'public', 'notes.html');
    res.setHeader('content-type', 'text/html');
    res.sendFile(notesFilepath);
}

const postApiNotes = (req, res) => {
    // Read and parse the database
    const dbFilepath = path.join(__dirname, 'db', 'db.json');
    const text = fs.readFileSync(dbFilepath).toString();
    const db = JSON.parse(text);

    // Add the new note to the database
    console.log(Object.keys(req));
    console.log(req.body);
    const note = req.body;
    note.id = Date.now();
    db.push(note);

    // Write the updated database to the filesystem.
    fs.writeFileSync(dbFilepath, JSON.stringify(db, null, 4));

    // All is well.
    res.status(200);
    res.end();
}

//assign IDs to notes becuase not assigned in starter code.
const initializeIds = () => {
    // Read and parse the database
    const dbFilepath = path.join(__dirname, 'db', 'db.json');
    const text = fs.readFileSync(dbFilepath).toString();
    const notes = JSON.parse(text);

    for (let i = 0; i < notes.length; i++) {
        const note = notes[i];
        if (!note.id) {
            note.id = i;
        }
    }

    // Write the updated database to the filesystem.
    fs.writeFileSync(dbFilepath, JSON.stringify(notes, null, 4));    
}

app.get('/', getIndex);
app.get('/api/notes', getApiNotes);
app.get('/assets/css/styles.css', getCSS);
app.get('/assets/js/index.js', getJS);
app.get('/notes', getNotes);
app.post('/api/notes',  jsonParser, postApiNotes);
app.delete('/api/notes/:id', deleteApiNotes);
initializeIds(); 

app.listen(3001, () => {
    console.log('API server now on port 3001!');
});