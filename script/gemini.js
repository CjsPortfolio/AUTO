const axios = require('axios');

module.exports.config = {
  name: 'gemini',
  version: '1.0.0',
  role: 0,
  hasPrefix: true,
  aliases: ['gemi', 'gem'],
  description: "An AI command powered by Google",
  usage: "gemini [prompt]",
  credits: 'Developer',
  cooldown: 3,
};

module.exports.run = async function({ api, event, args }) {
  const input = args.join(' ');
  
  if (!input) {
    api.sendMessage(`Gemini didn't generate your input because it was empty.`, event.threadID, event.messageID);
    return;
  }
  
  api.sendMessage(`🔍 Loading...`, event.threadID, event.messageID);
  
  try {
    const { data } = await axios.get(`https://joshweb.click/new/gemini?prompt=${encodeURIComponent(input)}`);
    const response = data.result.data; // Correctly access the 'result.data' property
    if (response) {
      api.sendMessage(`🔮 Gemini Pro (AI): \n\n ${response}\n————————————————`, event.threadID, event.messageID);
    } else {
      api.sendMessage(`Gemini couldn't generate a response for the provided prompt.`, event.threadID, event.messageID);
    }
  } catch (error) {
    console.error(error); // Log any errors to help with debugging
    api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
  }
};
