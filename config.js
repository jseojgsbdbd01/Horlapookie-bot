import settings from './settings.js';

export default {
  // Bot configuration
  prefix: process.env.BOT_PREFIX || '.', // input your prefix here 
  ownerNumber: process.env.BOT_OWNER || '93780587922', // input your number here 
  botName: process.env.BOT_NAME || '𝔼𝕔𝕝𝕚𝕡𝕤𝕖 𝕄𝔻',
  ownerName: process.env.BOT_OWNER_NAME || '𝔼𝕔𝕝𝕚𝕡𝕤𝕖', // optional 
  sessionId: 'ECLIPSE-MD-SESSION-ID', // sensitive name 
  BOOM_MESSAGE_LIMIT: 50,  

  // API configurations from settings
  openaiApiKey: settings.openaiApiKey,
  giphyApiKey: settings.giphyApiKey,
  geminiApiKey: settings.geminiApiKey,
  imgurClientId: settings.imgurClientId,
  copilotApiKey: settings.copilotApiKey,
  FOOTBALL_API_KEY: settings.FOOTBALL_API_KEY,
};
