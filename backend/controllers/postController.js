const Post = require('../models/Post');

// @desc    Get all posts
// @route   GET /api/posts
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('user', 'name branch batchYear').sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a post
// @route   POST /api/posts
exports.createPost = async (req, res) => {
    const { content, image } = req.body;

    try {
        const post = await Post.create({
            user: req.user._id,
            content,
            image
        });

        const fullPost = await post.populate('user', 'name branch batchYear');
        res.status(201).json(fullPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Like a post
// @route   PUT /api/posts/:id/like
exports.likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        
        if (post.likes.includes(req.user._id)) {
            post.likes = post.likes.filter(id => id.toString() !== req.user._id.toString());
        } else {
            post.likes.push(req.user._id);
        }

        await post.save();
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
