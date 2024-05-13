const axios = require("axios");

module.exports.config = {
    name: "gpt4",
    version: "1.0.0",
    description: "AI Powered by GPT-4",
    usage: "gpt4 [message]",
    author: "Rui",
    cooldown: 5,
    hasPrefix: true,
    role: 0,
  }; module.exports.run function({ fonts, api, message, args }) {
    const query = args.join(" ");

    if (!query) {
      message.reply("❌ | Please provide a query!");
    } else {
      const info = await
message.reply(`🔍Please wait...`);
      const response = await axios.get(`https://akhiro-rest-api.onrender.com/api/gpt4?q=${encodeURIComponent(query)}`);
      api.editMessage(
        `${fonts.bold("🤖 | GPT-4")}\n━━━━━━━━━━━━━━━\n${response.data.content}`,
        info.messageID,
      );
    }
  },
};
