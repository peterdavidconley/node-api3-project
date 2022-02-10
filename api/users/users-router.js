const express = require('express');
const {

  validateUserId,
  validateUser,
  validatePost,

} = require('../middleware/middleware');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const User = require('./users-model');
const Post = require('../posts/posts-model');

const router = express.Router();

router.get('/', (req, res, next) => {

  User.get()
    .then( users => {
      res.json(users)
    })
    .catch(next)

});

router.get('/:id', validateUserId, (req, res) => {
  res.json(req.user)
});

router.post('/', validateUser, (req, res, next) => {
  
  User.insert({ name: req.name })
    .then(newUser => {
      res.status(201).json(newUser)
    })
    .catch(next)

});

router.put('/:id', validateUserId, validateUser, async (req, res, next) => {

  try {
  const changes = req.body
  const { id } = req.params
  const updatedUser = await User.update(id, changes)
  res.status(201).json(updatedUser)
  }
  catch (err) {
    res.status(500).json({ message: 'Something went wrong'})
    next
  }
});

router.delete('/:id', validateUserId, async (req, res, next) => {

  try {
    await User.remove(req.params.id)
    res.json(req.user)
  } catch (err) {
    next(err)
  }

});

router.get('/:id/posts', validateUserId, async (req, res, next) => {

  try {
    const result = await User.getUserPosts(req.params.id)
    res.json(result)
  } catch (err) {
    next(err)
  }

});

router.post('/:id/posts', validateUserId, validatePost, async (req, res, next) => {
  
  try {
    const result = await Post.insert({ 
      user_id: req.params.id,
      text: req.text,
    })
    res.status(201).json(result)
  } catch (err) {
    next(err)
  }

});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customMessage: 'something tragic occurred',
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router;