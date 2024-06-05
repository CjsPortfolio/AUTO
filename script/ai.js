const axios = require('axios');
module.exports.config = {
  name: 'ai',
  version: '1.0.0',
  role: 0,
  hasPrefix: true,
  aliases: ['gpt', 'openai'],
  description: "An AI command powered by GPT-4",
  usage: "Ai [prompt]",
  credits: 'Developer',
  cooldown: 8,
};
module.exports.run = async function({
  api,
  event,
  args
}) {
  const input = args.join(' ');
  if (!input) {
    api.sendMessage(`Please provide a question or statement after 'ai'. For example: 'ai What is the capital of France?'`, event.threadID, event.messageID);
    return;
  }
  api.sendMessage(`🔍 •••`, event.threadID, event.messageID);
  try {
    const sender = event.senderID;
    const {
      data
    } = await axios.get(`https://deku-rest-api-3ijr.onrender.com/gpt4?prompt=${encodeURIComponent(input)}&uid=${sender}`);
    const response = data.gpt4;
    api.sendMessage(`GPT 4 (AI): \n\n ${response}\n——————————————`, event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
  }
};
