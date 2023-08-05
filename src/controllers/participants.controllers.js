const { Participants, Conversations } = require("../models");
const message = require("../utils/messages")

const addParticipants = async (req, res, next) => {
    try {
      const { userId, conversationId } = req.body;

      const dataConversation = await Conversations.findOne({
        where : {
          id: conversationId
        }
      })

      if(dataConversation.type === "single") return  res.json(message("Conversation not is group! "));

      const participantsArray = userId.map((participant) => ({
        userId: participant,
        conversationId
      }));
      
      await Participants.bulkCreate(participantsArray)
      res.status(201).json(message("Participants add"));
    } catch (error) {
      next(error);
    }
  };

  const deleteParticipants = async (req, res, next) => {
    try {
      const { userId, conversationId } = req.body;
  
   
      await userId.map(participant => {
        
        // Utiliza bulkDelete para eliminar los registros
       Participants.destroy({
        where: {
          userId: participant,
          conversationId
        }
      });
      });
 
      res.json(message("Participant delete"));
    } catch (error) {
      next(error);
    }
  };
  

  module.exports = {
    addParticipants,
    deleteParticipants
  }
