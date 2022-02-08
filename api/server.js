// implement your server here
// require your posts router and connect it here
const express = require('express');
const app = express();
const postRouter = require('./posts/post-router');

app.use(express.json());
app.use('/api/posts', postsRouter);

module.exports = app;