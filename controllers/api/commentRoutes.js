const router = require("express").Router();
const withAuth = require("../../utils/auth");
const { Post, Comment, User } = require("../../models");

router.get('/', async (req, res) => {
    // find all comments
    try {
      const commentData = await Comment.findAll({
        include: [{ model: User }, { model: Post}],
      });
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });


router.get('/:id', async (req, res) => {
    // find one Comment by its `id` value
    try {
      const commentData = await Comment.findByPk(req.params.id, {
        include: [{ model: User }, {model: Post}],
      });
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.post('/', async (req, res) => {
    // create a new Comment
    try {
      const newComment = await Comment.create(req.body);
      res.status(200).json(newComment);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  router.put('/:id', async (req, res) => {
    // update a Comment by its `id` value
    try {
      const updateComment = await Comment.update(req.body,{
        where:{id:req.params.id}
      });
      res.status(200).json(updateComment);
    } catch (err) {
      res.status(400).json(err);
    }
    });
  
    router.delete('/:id', async (req, res) => {
        // delete a Comment by its `id` value
        try {
          const deleteComm = await Comment.destroy({
            where: {
              id: req.params.id,
            },
          });
          if (!deleteCat) {
            res.status(404).json({ message: 'No Comment found with that id!' });
            return;
          }
          res.status(200).json(deleteComm);
        } catch (err) {
          res.status(500).json(err);
        }
      });
      