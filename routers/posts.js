const express = require("express")
const router = express.Router()
const postController = require("../controllers/post")
const authMiddleware = require("../middleware/auth")

router.get("/", postController.index)
router.get("/new", authMiddleware, postController.create)
router.get("/:id", postController.show)
router.get("/:slug/download", postController.download)


module.exports = router