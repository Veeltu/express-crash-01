const express = require("express");
const router = express.Router();
const {  getPosts,
    getSinglePost,
    addPost,
    updatePost,
    deletePost} = require("../controllers/postControllers")

// Get all posts
router.get('/', getPosts);

// Get a single post
router.get('/:id', getSinglePost);

// Create new post
router.post('/', addPost);

// Update post
router.put('/:id', updatePost);

// Delete post
router.delete('/:id', deletePost);

// Error handling middleware
router.use((err, req, res, next) => {
    res.status(err.status || 500).json({ msg: err.message });
});

module.exports = router;
