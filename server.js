const express = require('express');
const dotenv = require('dotenv').config();
const server = express();
const port = process.env.PORT || 3300;
const postsRouter = require('./routers/posts');

//reindirizzamento dalla home ai post
server.get('/', (req, res) => {
    res.redirect('/posts');
});

//rotte
server.use('/posts', postsRouter);

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
