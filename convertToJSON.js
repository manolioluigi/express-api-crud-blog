const fs = require('fs');
const posts = require('./db');

const jsonPosts = JSON.stringify(posts, null, 2);

fs.writeFileSync('posts.json', jsonPosts, 'utf-8');

console.log('Conversione completata con successo.');