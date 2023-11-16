const express = require("express")
const router = express.Router()
const adminController = require("../controllers/admin")
const authMiddleware = require("../middleware/auth")

router.use(authMiddleware)

router.get("/", adminController.index)
router.post("/edit/:id", adminController.edit)



module.exports = router