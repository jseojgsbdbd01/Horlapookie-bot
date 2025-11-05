import axios from 'axios';

const SONU_API_URL = 'https://omegatech-api.dixonomega.tech/api/ai/Sonu';

export async function generateSonuMusic(lyrics, style = '', instrument = '') {
  try {
    const params = new URLSearchParams();
    params.append('lyrics', lyrics);
    if (style) params.append('style', style);
    if (instrument) params.append('instrument', instrument);

    const response = await axios.get(`${SONU_API_URL}?${params.toString()}`, {
      timeout: 120000
    });

    if (response.data && response.data.status) {
      return {
        success: true,
        audioUrl: response.data.audioUrl,
        coverUrl: response.data.coverUrl,
        title: response.data.title || 'Generated Music',
        lyrics: response.data.lyrics || lyrics
      };
    } else {
      return {
        success: false,
        error: response.data?.message || 'Failed to generate music'
      };
    }
  } catch (err) {
    return {
      success: false,
      error: err.response?.data?.message || err.message || 'API request failed'
    };
  }
}

export function formatSonuResponse(result) {
  if (!result.success) {
    return `❌ *Music Generation Failed*\n\n${result.error}`;
  }

  return `🎵 *Music Generated Successfully!*\n\n*Title:* ${result.title}\n\n_Sending audio file..._`;
}
