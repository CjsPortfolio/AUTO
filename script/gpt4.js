const axios = require('axios');
module.exports.config = {
  name: 'gpt4',
  version: '1.0.0',
  role: 0,
  hasPrefix: true,
  aliases: ['gpt', 'openai'],
  description: "An AI command powered by GPT-4",
  usage: "gpt4 [prompt]",
  credits: 'Developer',
  cooldown: 3,
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
  api.sendMessage(`🔍 Generating your Prompt Using GPT4...`, event.threadID, event.messageID);
  try {
    const {
      data
    } = await axios.get(`https://akhiro-rest-api.onrender.com/api/gpt4?q=${encodeURIComponent(input)}`)
  } catch (error) {
    api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
  }
};
