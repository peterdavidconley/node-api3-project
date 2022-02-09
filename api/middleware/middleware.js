const User = require('../users/users-model')

function logger(req, res, next) {

  const timestamp = new Date().toLocaleString();
  const method = req.method
  const url = req.url
  console.log(`[${timestamp}] ${method} to ${url}`);
  next()

}

async function validateUserId(req, res, next) {

  try {
    const user = await User.getById(req.params.id)
    if (!user) {
      res.status(404).json({
        message: 'user not found'
      })
    } else {
      req.user = user
      res.status(201).json(user)
      next()
    }
  } catch (err) {
    res.status(500).json({
      message: 'error fetching user'
    })
  }
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