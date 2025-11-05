import axios from 'axios';

const SORA2_CREATE_URL = 'https://omegatech-api.dixonomega.tech/api/ai/sora2-create';
const SORA2_STATUS_URL = 'https://omegatech-api.dixonomega.tech/api/ai/sora2-status';

export async function createSora2Video(prompt, imageUrl = null) {
  try {
    const data = { prompt };
    if (imageUrl) {
      data.imageUrl = imageUrl;
    }

    const response = await axios.post(SORA2_CREATE_URL, data, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 30000
    });

    if (response.data && response.data.id) {
      return {
        success: true,
        taskId: response.data.id,
        message: response.data.message || 'Video generation started'
      };
    } else {
      return {
        success: false,
        error: response.data?.error || 'Failed to start video generation'
      };
    }
  } catch (err) {
    return {
      success: false,
      error: err.response?.data?.error || err.message || 'API request failed'
    };
  }
}

export async function checkSora2Status(taskId) {
  try {
    const response = await axios.get(`${SORA2_STATUS_URL}?id=${taskId}`, {
      timeout: 30000
    });

    if (response.data) {
      return {
        success: true,
        status: response.data.status,
        videoUrl: response.data.videoUrl,
        progress: response.data.progress,
        error: response.data.error
      };
    } else {
      return {
        success: false,
        error: 'Failed to check status'
      };
    }
  } catch (err) {
    return {
      success: false,
      error: err.response?.data?.error || err.message || 'API request failed'
    };
  }
}

export async function waitForSora2Completion(taskId, maxAttempts = 60, interval = 5000) {
  for (let i = 0; i < maxAttempts; i++) {
    const status = await checkSora2Status(taskId);
    
    if (!status.success) {
      return status;
    }

    if (status.status === 'completed' && status.videoUrl) {
      return {
        success: true,
        videoUrl: status.videoUrl
      };
    }

    if (status.status === 'failed' || status.error) {
      return {
        success: false,
        error: status.error || 'Video generation failed'
      };
    }

    await new Promise(resolve => setTimeout(resolve, interval));
  }

  return {
    success: false,
    error: 'Video generation timeout (5 minutes)'
  };
}
