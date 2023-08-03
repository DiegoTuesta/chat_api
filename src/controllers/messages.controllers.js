const { Messages, Participants, Conversations } = require("../models")
const message = require("../utils/messages")

const createMessage = async (req, res, next) =>{
    try {
        const {conversationId, content, senderId } = req.body;
        await Messages.create({
            conversationId,
            content,
            senderId
        });
        res.status(201).json(message("Message created"));        
    } catch (error) {
        next(error);
    }
}
const getMessagesUser = async (req, res, next)=> {
    try {
        const {id} = req.params;
        const data = await Conversations.findAll({
        //   where : {senderId:id},
            include:[{
                model: Participants
            },{
                model: Messages,
                where: {senderId: id}
            }
        ]
        })
        res.json(data)
    } catch (error) {
        next(error)
    }
}

const deleteMessage = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      await Messages.destroy({  where: {  id } })
      // antes de eliminar la conversacion 3
      // elimino todos los registros en participantes que usen ese id
      res.json(message("Message Deleted"));
    } catch (error) {
      next(error);
    }
  };




module.exports = {
    createMessage,
    getMessagesUser,
    deleteMessage
}