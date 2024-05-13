const axios = require('axios');
module.exports.config = {
  name: 'ai',
  version: '1.0.0',
  role: 0,
  hasPrefix: true,
  aliases: ['gpt', 'openai'],
  description: "An AI command powered by GPT3.5 Turbo",
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
  api.sendMessage(`🔍Please Wait...`, event.threadID, event.messageID);
  try {
    const {
      data
    } = await axios.get(`https://joshweb.click/new/gpt-3_5-turbo?prompt=${encodeURIComponent(input)}`);
    const response = data.response;
    api.sendMessage(response + '\n\nhttps://www.facebook.com/61557924257806', event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
  }
};
