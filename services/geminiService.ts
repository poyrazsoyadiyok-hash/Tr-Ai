
import { GoogleGenAI, Chat } from "@google/genai";

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const startChat = (modelName: string): Chat => {
  return ai.chats.create({
    model: modelName,
     config: {
        systemInstruction: `You are Kumru AI. KumruPro is an expert coder. KumruFlash is a helpful, fast assistant for general questions. Your personality should reflect the selected model. Add personality and use emojis where appropriate.`,
    },
  });
};

export const sendMessageStream = async (chat: Chat, message: string) => {
  return chat.sendMessageStream({ message });
};
