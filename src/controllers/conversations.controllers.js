const { Conversations, Participants, Messages } = require("../models");
const message = require("../utils/messages")

const createConversation = async (req, res, next) => {
  try {
    // body: { createdBy: 2, participant: 4  }
    const { createdBy, participants, type } = req.body;
    // crear la conversacion
    const conversation = await Conversations.create({ createdBy, type });
    // conversation = { id, title, creattedBy, type, createdAt, updatedAt}
    // tomar el id de la conversacion creada y agreagar a los participantes
    const { id } = conversation;
    // agregar a los participantes en la tabla pivote
    const participantsArray = participants.map((participant) => ({
      userId: participant,
      conversationId: id,
    }));
    participantsArray.push({ userId: createdBy, conversationId: id });
    await Participants.bulkCreate(participantsArray)

    res.status(201).json(message("Conversation created"));
  } catch (error) {
    next(error);
  }
};

const getConversation = async (req, res, next)=> {
  try {
    const {id} = req.params;
    const conversations = await Conversations.findAll({
      where: {id},
      include: [{
        model: Participants,
    },{
      model: Messages
    }
  ],
     
    })
    res.json(conversations)
  } catch (error) {
    next(error)
  }
}

const deleteConversation = async (req, res, next) => {
  try {
    const { id } = req.params;

    // await Messages.destroy({  where: { conversationId : id } })
    // antes de eliminar la conversacion 3
    // elimino todos los registros en participantes que usen ese id
    await Conversations.destroy({ where: { id } });
    res.json(message("Conversation deleted"));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createConversation,
  deleteConversation,
  getConversation
};

// [3, 5, 7, 8, 9]
// tranformar el arreglo de participantes
/* 
[
  { userId: 3, conversationId: id },
  { userId: 5, conversationId: id },
  { userId: 7, conversationId: id },
  { userId: 8, conversationId: id },
  { userId: 9, conversationId: id }
]

const participats = participatns.map(participant => (
  {userId: participant, conversationId: id}
));


*/
