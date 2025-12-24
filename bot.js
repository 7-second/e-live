import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

// Load .env variables
dotenv.config();

const TOKEN = process.env.BOT_TOKEN;
const APP_URL = process.env.APP_URL;

const bot = new TelegramBot(TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "Click down below to start watch all channels in telegram", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Open E-live",
            web_app: { url: APP_URL },
          },
        ],
      ],
    },
  });
});

console.log("Bot is running...");
