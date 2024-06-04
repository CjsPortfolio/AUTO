const axios = require('axios');

module.exports.config = {
  name: 'tempmail',
  version: '1.0.0',
  role: 0, // 0 for user
  hasPrefix: true,
  aliases: ['generate', 'gen'],
  description: "Generate a temporary email or check its inbox",
  usage: "tempmail <generate|inbox>",
  credits: 'Developer',
  cooldown: 5,
};

module.exports.run = async function({ api, event, args }) {
  const command = args[0];

  if (command === 'generate' || command === 'gen') {
    try {
      const response = await axios.get('https://markdevs-last-api-a4sm.onrender.com/api/gen');
      const tempEmail = response.data.email;

      api.sendMessage(`Temporary Email Generated: ${tempEmail}`, event.threadID, event.messageID);
    } catch (error) {
      api.sendMessage(`Error generating temporary email: ${error.message}`, event.threadID, event.messageID);
    }
  } else if (command === 'inbox') {
    const tempEmail = args[1];
    if (!tempEmail) {
      api.sendMessage('Please provide the temporary email to check the inbox.', event.threadID, event.messageID);
      return;
    }

    try {
      const inboxResponse = await axios.get(`https://markdevs-last-api-a4sm.onrender.com/api/getmessage/${tempEmail}`);
      const inboxMessages = inboxResponse.data;

      if (inboxMessages.length === 0) {
        api.sendMessage('Inbox is empty.', event.threadID, event.messageID);
      } else {
        let messages = 'Inbox Messages:\n';
        inboxMessages.forEach((msg, index) => {
          messages += `\n${index + 1}. From: ${msg.from}\nSubject: ${msg.subject}\nDate: ${msg.date}\n\n`;
        });
        api.sendMessage(messages, event.threadID, event.messageID);
      }
    } catch (error) {
      api.sendMessage(`Error fetching inbox messages: ${error.message}`, event.threadID, event.messageID);
    }
  } else {
    api.sendMessage('Invalid command. Use "tempmail generate" to generate a tempmail or "tempmail inbox <email>" to check inbox.', event.threadID, event.messageID);
  }
};
