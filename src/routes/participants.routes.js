const { Router } = require("express");
const { addParticipants,deleteParticipants } = require("../controllers/participants.controllers");
const authenticate = require("../middlewares/auth.middleware");
const router = Router();

router.post("/participants", authenticate, addParticipants);
router.delete("/participants", authenticate, deleteParticipants);



module.exports = router;