// require your server and launch it here
const server = require('./api/server');

const PORT = 8080;

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})
