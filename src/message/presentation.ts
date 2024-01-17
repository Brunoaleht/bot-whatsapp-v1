import type { Message } from "whatsapp-web.js";

interface ConversationState {
  [user: string]: {
    step: number;
  };
}

let conversationState: ConversationState = {};

export const handlePresentationAutoAtendimento = (msg: Message) => {
  const { from } = msg;

  if (!conversationState[from]) {
    startConversation(from);
  }

  switch (conversationState[from].step) {
    case 1:
      sendIntroduction(msg);
      break;
    case 2:
      handleUserResponse(msg);
      break;
    default:
      break;
  }
};

const startConversation = (user: string) => {
  conversationState[user] = { step: 1 };
};

const sendIntroduction = (msg: Message) => {
  const { from } = msg;

  msg.reply("Olá! Bem-vindo ao Bot de Autoatendimento.");
  msg.reply("Eu sou um bot que pode te ajudar com algumas informações.");
  msg.reply("Como posso ajudar você hoje?");

  conversationState[from].step = 2;
};

const handleUserResponse = (msg: Message) => {
  const { body } = msg;

  if (body.toLowerCase().includes("quem você é")) {
    msg.reply("Eu sou um bot de autoatendimento!");
  } else if (body.toLowerCase().includes("ajuda")) {
    msg.reply("Claro, como posso te ajudar?");
  } else {
    msg.reply("Desculpe, não entendi. Pode reformular sua pergunta?");
  }
};
