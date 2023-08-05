const { Router } = require("express");
const { createMessage, getMessagesUser,deleteMessage  } = require("../controllers/messages.controllers")
const authenticate = require("../middlewares/auth.middleware");
const router = Router();

//crear mensaje
router.post("/messages", authenticate, createMessage)
//obtener todos los mensajes de un usuario
router.get("/messages/:id", authenticate, getMessagesUser)
//eliminar mensaje
router.delete("/messages/:id", authenticate, deleteMessage)


module.exports = router;