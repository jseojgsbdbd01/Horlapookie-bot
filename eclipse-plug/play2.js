
import axios from 'axios';
import yts from 'yt-search';
import fs from 'fs';
import path from 'path';
import { channelInfo } from '../lib/channelConfig.js';

// Load emojis
const emojisPath = path.join(process.cwd(), 'data', 'emojis.json');
const emojis = JSON.parse(fs.readFileSync(emojisPath, 'utf8'));

const BASE_URL = 'https://noobs-api.top';

export default {
  name: 'play2',
  description: 'Search and play MP3 music from YouTube (audio only) - Alternative method',
  aliases: ['music2', 'song2', 'p'],
  category: 'Music & Media',
  
  async execute(msg, { sock, args, settings }) {
    const from = msg.key.remoteJid;
    const start = Date.now();

    // React with processing emoji
    await sock.sendMessage(from, {
      react: { text: emojis.processing || '⏳', key: msg.key }
    });

    const query = args.join(' ');
    
    if (!query) {
      await sock.sendMessage(from, {
        react: { text: emojis.error || '❌', key: msg.key }
      });
      
      return await sock.sendMessage(from, {
        text: `${emojis.music || '🎵'} *Music Player 2*\n\nPlease provide a song name or keyword.\n\n⚡ *Example:* \`${settings.prefix}play2 Shape of You\``
      }, { quoted: msg });
    }

    try {
      console.log('[PLAY2] Searching YT for:', query);
      
      // Search for the video
      const search = await yts(query);
      const video = search.videos[0];

      if (!video) {
        await sock.sendMessage(from, {
          react: { text: emojis.error || '❌', key: msg.key }
        });
        
        return await sock.sendMessage(from, {
          text: `${emojis.error || '❌'} No results found for your query: "${query}"`
        }, { quoted: msg });
      }

      // Send preview with thumbnail
      const previewMessage = {
        image: { url: video.thumbnail },
        caption: `${emojis.music || '🎵'} *MUSIC PLAYER 2*\n\n` +
          `╭───────────────◆\n` +
          `│⿻ *Title:* ${video.title}\n` +
          `│⿻ *Duration:* ${video.timestamp}\n` +
          `│⿻ *Views:* ${video.views.toLocaleString()}\n` +
          `│⿻ *Uploaded:* ${video.ago}\n` +
          `│⿻ *Channel:* ${video.author.name}\n` +
          `╰────────────────◆\n\n` +
          `${emojis.processing || '⏳'} Processing audio download...`,
        contextInfo: channelInfo.contextInfo
      };

      await sock.sendMessage(from, previewMessage, { quoted: msg });

      // Get download link with multiple fallbacks
      const safeTitle = video.title.replace(/[\\/:*?"<>|]/g, '');
      const fileName = `${safeTitle}.mp3`;
      let downloadLink = null;
      let downloadError = '';

      // Try primary API
      try {
        console.log('[PLAY2] Trying primary API...');
        const apiURL = `${BASE_URL}/dipto/ytDl3?link=${encodeURIComponent(video.url)}&format=mp3`;
        const response = await axios.get(apiURL, { timeout: 45000, maxRedirects: 5 });
        
        if (response.data && response.data.downloadLink) {
          downloadLink = response.data.downloadLink;
          console.log('[PLAY2] Primary API success!');
        }
      } catch (err) {
        console.log('[PLAY2] Primary API failed:', err.message);
        downloadError = err.message;
      }

      // Try fallback API 1
      if (!downloadLink) {
        try {
          console.log('[PLAY2] Trying fallback API 1...');
          const fallbackURL = `https://api.agatz.xyz/api/ytmp3?url=${encodeURIComponent(video.url)}`;
          const fallbackResponse = await axios.get(fallbackURL, { timeout: 45000 });
          
          if (fallbackResponse.data && fallbackResponse.data.data && fallbackResponse.data.data.download) {
            downloadLink = fallbackResponse.data.data.download;
            console.log('[PLAY2] Fallback API 1 success!');
          }
        } catch (err) {
          console.log('[PLAY2] Fallback API 1 failed:', err.message);
        }
      }

      // Try fallback API 2
      if (!downloadLink) {
        try {
          console.log('[PLAY2] Trying fallback API 2...');
          const fallbackURL2 = `https://api.ryzendesu.vip/api/downloader/ytmp3?url=${encodeURIComponent(video.url)}`;
          const fallbackResponse2 = await axios.get(fallbackURL2, { timeout: 45000 });
          
          if (fallbackResponse2.data && fallbackResponse2.data.url) {
            downloadLink = fallbackResponse2.data.url;
            console.log('[PLAY2] Fallback API 2 success!');
          }
        } catch (err) {
          console.log('[PLAY2] Fallback API 2 failed:', err.message);
        }
      }

      if (!downloadLink) {
        await sock.sendMessage(from, {
          react: { text: emojis.error || '❌', key: msg.key }
        });
        
        return await sock.sendMessage(from, {
          text: `${emojis.error || '❌'} Failed to retrieve the MP3 download link from all APIs.\n\n💡 *Please try:*\n• Using ${global.COMMAND_PREFIX || '.'}p command instead\n• Try again in a few minutes\n• Use a different song search term\n\n🛠️ Error: ${downloadError}`
        }, { quoted: msg });
      }

      // Calculate response time
      const elapsed = Date.now() - start;

      // Send the audio file
      await sock.sendMessage(from, {
        document: { url: downloadLink },
        mimetype: 'audio/mpeg',
        fileName: fileName,
        caption: `${emojis.success || '✅'} *Music Download Complete*\n\n📱 *Title:* ${video.title}\n🎧 *Format:* MP3\n⭐ *Quality:* High\n💫 *Duration:* ${video.timestamp}\n${emojis.lightning || '⚡'} *Response time:* \`${elapsed} ms\`\n🔗 *URL:* ${video.url}\n\n> Powered by Eclipse MD`
      }, { quoted: msg });

      // Success reaction
      await sock.sendMessage(from, {
        react: { text: emojis.success || '✅', key: msg.key }
      });

    } catch (error) {
      console.error('[PLAY2] Error:', error.message);
      
      await sock.sendMessage(from, {
        react: { text: emojis.error || '❌', key: msg.key }
      });

      return await sock.sendMessage(from, {
        text: `${emojis.error || '❌'} *Download failed*\n\n🔧 *Error:* ${error.message}\n\n💡 *Please try:*\n• Different search terms\n• Try again in a moment\n• Use ${settings.prefix}play command instead`
      }, { quoted: msg });
    }
  }
};
