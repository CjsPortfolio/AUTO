const axios = require('axios');

module.exports.config = {
  name: 'lyrics',
  version: '1.0.0',
  role: 0, // 0 for user
  hasPrefix: true,
  aliases: [],
  description: 'Find lyrics for a song',
  usage: 'lyrics <song name>',
  credits: 'Grey, Converted by CJ Villavito',
  cooldown: 5,
};

module.exports.run = async function({ api, event, args }) {
  const song = args.join(' ');

  if (!song) {
    return api.sendMessage('Please enter a song.', event.threadID, event.messageID);
  }

  const apiUrl = `https://markdevs-last-api-cvxr.onrender.com/search/lyrics?q=${encodeURIComponent(song)}`;

  try {
    const res = await axios.get(apiUrl);
    const { lyrics, title, artist } = res.data.result;

    if (lyrics && title && artist) {
      const message = `Title: ${title}\n\nArtist: ${artist}\n\nLyrics: ${lyrics}`;
      api.sendMessage(message, event.threadID, event.messageID);
    } else {
      api.sendMessage('Sorry, the lyrics could not be found.', event.threadID, event.messageID);
    }
  } catch (error) {
    console.error('Lyrics API error:', error);
    api.sendMessage('Failed to fetch lyrics.', event.threadID, event.messageID);
  }
};
