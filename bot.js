import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

// Load .env variables
dotenv.config();

const TOKEN = process.env.BOT_TOKEN;
const APP_URL = process.env.APP_URL;

const bot = new TelegramBot(TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "Open IPTV inside Telegram:", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Open IPTV",
            web_app: { url: APP_URL },
          },
        ],
      ],
    },
  });
});

console.log("Bot is running...");
