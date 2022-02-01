const express = require('express');
const path = require('path');

const app = express();

const getIndex = (req, res) => {
    const indexFilepath = path.join(__dirname, 'public', 'index.html');
    res.setHeader('content-type', 'text/html');
    res.sendFile(indexFilepath);
}

app.get('/', getIndex);

app.listen(3001, () => {
    console.log('API server now on port 3001!');
});