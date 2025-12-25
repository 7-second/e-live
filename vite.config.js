const sendTelegramMessage = async (text) => {
  const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;
  const URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  try {
    await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text,
        parse_mode: "HTML",
      }),
    });
    console.log("Telegram message sent!");
  } catch (error) {
    console.error("Telegram Error:", error);
  }
};