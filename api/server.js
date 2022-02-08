// implement your server here
// require your posts router and connect it here
const express = require('express');
const app = express();
const postsRouter = require('./posts/posts-router');

app.use(express.json());
app.use('/api/posts', postsRouter);

module.exports = app;