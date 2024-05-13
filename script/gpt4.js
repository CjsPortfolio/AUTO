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
    api.sendMessage(`Please provide a question or statement after 'gpt4'. For example: 'gpt4 What is the capital of France?'`, event.threadID, event.messageID);
    return;
  }
  api.sendMessage(`🔍 "${text}"`, event.threadID, event.messageID);
  try {
    const {
      data
    } = await axios.get(`https://joshweb.click/new/gpt-4_adv?prompt=${encodeURIComponent(text)}`);
    const response = data.response;
    api.sendMessage(response + '\n\nhttps://www.facebook.com/61557924257806', event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
  }
};
