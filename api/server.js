const express = require('express');
const server = express();
const { logger } = require('./middleware/middleware');
const { validatePost } = require('./middleware/middleware');
const { validateUser } = require('./middleware/middleware');
const { validateUserId } = require('./middleware/middleware');
const usersRouter = require('./users/users-router');

server.use(logger);
server.use(express.json());
server.use('/api/users', usersRouter);

// global middlewares and the user's router need to be connected here


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
