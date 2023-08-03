const { Router } = require("express");
const { createMessage, getMessagesUser,deleteMessage  } = require("../controllers/messages.controllers")
const authenticate = require("../middlewares/auth.middleware");
const router = Router();

router.post("/messages", authenticate, createMessage)
router.get("/messages/:id", authenticate, getMessagesUser)
router.delete("/messages/:id", authenticate, deleteMessage)


module.exports = router;