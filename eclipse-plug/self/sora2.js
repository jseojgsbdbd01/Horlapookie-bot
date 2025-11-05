import { createSora2Video, waitForSora2Completion } from '../../lib/soraVideoAPI.js';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

export default {
  name: 'sora2',
  description: 'Generate AI videos using Sora-2 model',
  category: 'Video Generator',
  async execute(msg, { sock, args, settings }) {
    const from = msg.key.remoteJid;
    const prefix = settings.prefix || '.';
    
    try {
      if (!args || args.length === 0) {
        return await sock.sendMessage(from, { 
          text: `*🎬 Sora-2 Video Generator*\n\nGenerate AI videos from text prompts or images!\n\n*Usage:*\n${prefix}sora2 <prompt>\n${prefix}sora2 <prompt> | <image_url>\n\n*Example:*\n${prefix}sora2 A cat walking on the beach at sunset\n${prefix}sora2 Ocean waves crashing | https://example.com/image.jpg\n\n_Note: Video generation takes 2-5 minutes_`
        }, { quoted: msg });
      }

      const fullText = args.join(' ');
      const parts = fullText.split('|').map(p => p.trim());
      
      const prompt = parts[0];
      let imageUrl = parts[1] || null;

      if (!imageUrl && msg.message?.imageMessage) {
        try {
          const buffer = await sock.downloadMediaMessage(msg.message.imageMessage);
          const tempImagePath = path.join(process.cwd(), 'data', `temp_${Date.now()}.jpg`);
          fs.writeFileSync(tempImagePath, buffer);
          imageUrl = tempImagePath;
        } catch (imgErr) {
          console.log('Image download failed:', imgErr.message);
        }
      }

      if (prompt.length < 10) {
        return await sock.sendMessage(from, { 
          text: '❌ Prompt too short! Please provide at least 10 characters.' 
        }, { quoted: msg });
      }

      await sock.sendMessage(from, { 
        text: `🎬 *Creating Sora-2 video...*\n\nPrompt: ${prompt}\n${imageUrl ? 'Image: Provided\n' : ''}\n_This will take 2-5 minutes..._` 
      }, { quoted: msg });

      const createResult = await createSora2Video(prompt, imageUrl);

      if (!createResult.success) {
        return await sock.sendMessage(from, { 
          text: `❌ *Video creation failed*\n\n${createResult.error}` 
        }, { quoted: msg });
      }

      await sock.sendMessage(from, { 
        text: `⏳ *Video generation started*\n\nTask ID: ${createResult.taskId}\n\n_Waiting for completion..._` 
      }, { quoted: msg });

      const finalResult = await waitForSora2Completion(createResult.taskId);

      if (!finalResult.success) {
        return await sock.sendMessage(from, { 
          text: `❌ *Video generation failed*\n\n${finalResult.error}` 
        }, { quoted: msg });
      }

      await sock.sendMessage(from, { 
        text: `✅ *Video generated successfully!*\n\n_Downloading and sending..._` 
      }, { quoted: msg });

      try {
        const videoResponse = await axios.get(finalResult.videoUrl, {
          responseType: 'arraybuffer',
          timeout: 120000
        });

        const tempVideoPath = path.join(process.cwd(), 'data', `sora2_${Date.now()}.mp4`);
        fs.writeFileSync(tempVideoPath, videoResponse.data);

        await sock.sendMessage(from, {
          video: { url: tempVideoPath },
          mimetype: 'video/mp4',
          caption: `🎬 *Sora-2 Generated Video*\n\n${prompt}`
        }, { quoted: msg });

        fs.unlinkSync(tempVideoPath);
      } catch (downloadErr) {
        console.error('Video download error:', downloadErr);
        await sock.sendMessage(from, { 
          text: `✅ Video generated!\n\n*Video URL:* ${finalResult.videoUrl}\n\n_Download failed, please use the URL directly_` 
        }, { quoted: msg });
      }
    } catch (err) {
      console.error('Sora-2 error:', err);
      await sock.sendMessage(from, { 
        text: `❌ An error occurred:\n${err.message}` 
      }, { quoted: msg });
    }
  }
};
