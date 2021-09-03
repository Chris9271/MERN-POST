const express = require('express');
const postController = require('../controller/post-controller');
const router = express.Router();

router.get('/', postController.getAllPosts);
router.post('/', postController.addNewPost);
router.delete('/', postController.deletePost);
router.patch('/', postController.editPost);

module.exports = router;