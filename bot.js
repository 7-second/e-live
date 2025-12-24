const TelegramBot = require("node-telegram-bot-api");

const TOKEN = "8240505239:AAF3TVsHINVpW7zxVyCI6oooi7c1pctsNnA"; 
const APP_URL = "https://e-live-one.vercel.app/"; 

const bot = new TelegramBot(TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "Open E-live:", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Open E-live",
            web_app: { url: APP_URL } // opens full screen in Telegram
          }
        ]
      ]
    }
  });
});
