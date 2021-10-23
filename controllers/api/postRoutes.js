const { Post, User, Comment }= require("../../models");
const router = require("express").Router();

router.get('/', async (req, res) => {
    // find all posts
    // be sure to include its associated Products
    try {
      const posts = await Post.findAll({
        include: [{ model: User },{model: Comment}],
      });
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.get('/:id', async (req, res) => {
    // find one Post by its `id` value
    // be sure to include its associated Products
    try {
      const post = await Post.findByPk(req.params.id, {
        include: [{ model: User },{model: Comment}],
      });
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.post('/', async (req, res) => {
    // create a new Post
    try {
      const newPost = await Post.create(req.body);
      res.status(200).json(newPost);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  router.put('/:id', async (req, res) => {
    // update a Post by its `id` value
    try {
      const updatePost = await Post.update(req.body,{
        where:{id:req.params.id}
      });
      res.status(200).json(updatePost);
    } catch (err) {
      res.status(400).json(err);
    }
    });
  
  
  router.delete('/:id', async (req, res) => {
    // delete a Post by its `id` value
    try {
      const deletePost = await Post.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (!deletePost) {
        res.status(404).json({ message: 'No Post found with that id!' });
        return;
      }
      res.status(200).json(deletePost);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;