const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all posts
router.get('/', async (req, res) => {

    try {
        const postData = await Post.findAll(
            {
                include: [{ model: User }, { model: Comment }],
            },
            {
                where: { user_id: req.session.id },
            }
        );

        res.status(200).json(postData);

    } catch (err) {
        res.status(400).json(err);
    }
});

// Get indivdual post
router.get('/:id', async (req, res) => {

    try {
        const postData = await Post.findByPk(
            req.params.id,
            {
                include: [{ model: User, attributes: ['name'] }],
            },
            {
                where: {
                    user_id: req.session.id,
                },
            }
        );

        const post = postData.get({ plain: true });

        const commentData = await Comment.findAll({
            where: { post_id: post.id },
            include: [{ model: User, attributes: ['name'] }]
        });

        const comments = commentData.map((comment) => comment.get({ plain: true }));

        if (!postData) {
            res.status(400).json({ message: 'No post found' });
            return;
        }

        res.render('single-post', {
            post,
            comments,
            logged_in: req.session.logged_in
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

// Create post
router.post('/', async (req, res) => {

    try {
        const postData = await Post.create({
            title: req.body.title,
           description: req.body.description,
            user_id: req.session.user_id,
        });

        console.log(postData);

        res.status(200).json(postData);

    } catch (err) {
        res.status(400).json(err);
    }
});

// Get post to edit 
router.get('/edit-post/:id', withAuth, async (req, res) => {

    try {
        const postData = await Post.findByPk(req.params.id);
        const post = postData.get({ plain: true });

        res.render('edit-post', {
            post,
            logged_in: req.session.logged_in,
            post_id: req.params.id
        });

    } catch (err) {
        res.status(400).json(err);
    };
});

// Update post
router.put('/edit/:id', async (req, res) => {

    try {
        const postData = await Post.update(
            {
                title: req.body.title,
               description: req.body.description,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );

        if (!postData) {
            res.status(404).json({ message: 'No post found' });
            return;
        }

        res.status(200).json(postData);

    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete post
router.delete('/delete/:id', async (req, res) => {

    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!postData) {
            res.status(404).json({ message: 'No Post found' });
            return;
        }

        res.status(200).json(postData);

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;