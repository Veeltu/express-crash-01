
let posts = [
    { id: 1, title: 'post one' },
    { id: 2, title: 'post two' },
    { id: 3, title: 'post three' },
];

// @desc Get all posts
// @route GET /api/posts
const getPosts =  (req, res, next) => {
    const limit = parseInt(req.query.limit);

    if (!isNaN(limit) && limit > 0) {
        return res.status(200).json(posts.slice(0, limit));
    }
    res.status(200).json(posts);
}

// @desc get single post
// @route GET /api/posts/id
const getSinglePost = ((req, res, next) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);

    if (!post) {
        const error = new Error(`Post not found with id: ${id}`);
        error.status = 404;
        return next(error);
    }
    res.status(200).json(post);
});


// @desc create new post
// @route POST /api/posts
const addPost = ( (req, res, next) => {
    const newPost = {
        id: posts.length + 1,
        title: req.body.title  // Assuming title is sent in the body as JSON
    };

    if (!newPost.title) {
        const error = new Error("Please include a title");
        error.status = 400;
        return next(error);
    }

    posts.push(newPost);
    res.status(201).json(posts);
});

// @desc update
// @route PUT /api/posts/:id
const updatePost = ((req, res, next) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);

    if (!post) {
        const error = new Error(`Post not found with id: ${id}`);
        error.status = 404;
        return next(error);
    }

    post.title = req.body.title;
    res.status(200).json(post);
});

// @desc delete
// @route DELETE /api/posts/:id
const deletePost = ((req, res, next) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);

    if (!post) {
        const error = new Error(`Post not found with id: ${id}`);
        error.status = 404;
        return next(error);
    }

    posts = posts.filter((post) => post.id !== id);
    res.status(200).json(post);
});


module.exports = {
    getPosts,
    getSinglePost,
    addPost,
    updatePost,
    deletePost
};