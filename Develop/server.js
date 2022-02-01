const express = require('express');
const path = require('path');

const app = express();




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


app.get('/', getIndex);
app.get('/api/notes', getApiNotes);
app.get('/assets/css/style.css', getCSS);
app.get('/assets/js/index.js', getJS);
app.get('/notes', getNotes);


app.listen(3001, () => {
    console.log('API server now on port 3001!');
});