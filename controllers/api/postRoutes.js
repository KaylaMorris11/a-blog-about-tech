const { Post, User, Comment }= require("../../models");
const router = require("express").Router();

router.get("/:id", async (req, res))