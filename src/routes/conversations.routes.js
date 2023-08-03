const { Router } = require("express");
const {
  createConversation,
  deleteConversation,
  getConversation,
} = require("../controllers/conversations.controllers");
const authenticate = require("../middlewares/auth.middleware");

const router = Router();

// validadores
router.post("/conversations", authenticate, createConversation);
router.get("/conversations/:id", authenticate, getConversation)
router.delete("/conversations/:id", deleteConversation);

module.exports = router;
