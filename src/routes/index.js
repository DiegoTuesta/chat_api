const userRoutes = require("./user.routes");
const conversationRoutes = require("./conversations.routes");
const messagesRoutes = require("../routes/messages.routes")
const participantsRoutes = require("../routes/participants.routes")
const apiRoutes = (app) => {
  app.use(userRoutes);
  app.use(conversationRoutes);
  app.use(messagesRoutes);
  app.use(participantsRoutes);
};

module.exports = apiRoutes;
