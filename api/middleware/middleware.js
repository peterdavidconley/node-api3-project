const User = require('../users/users-model')

function logger(req, res, next) {
  const timestamp = new Date().toLocaleString();
  const method = req.method
  const url = req.url
  console.log(`[${timestamp}] ${method} to ${url}`);
  next()

}

function validateUserId(req, res, next) {

  let { id } = req.params
  console.log(`validateUserID`)
  next()

}

function validateUser(req, res, next) {

  console.log(`validateUser`)
  next()

}

function validatePost(req, res, next) {

  console.log(`validatePost`)
  next()

}

// do not forget to expose these functions to other modules

module.exports = {

  logger, 
  validatePost,
  validateUser,
  validateUserId,

}