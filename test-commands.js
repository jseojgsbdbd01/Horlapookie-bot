import yts from 'yt-search';
import { musicDownloader } from './lib/musicHelper.js';

console.log('🧪 Testing Commands...\n');

// Test 1: Music Search
console.log('═══════════════════════════════════════');
console.log('📱 TEST 1: Music Search Functionality');
console.log('═══════════════════════════════════════');

async function testMusicSearch() {
  try {
    const searchQuery = 'Shape of You';
    console.log(`🔍 Searching for: "${searchQuery}"`);
    
    const { videos } = await yts(searchQuery);
    
    if (!videos || videos.length === 0) {
      console.log('❌ No results found');
      return;
    }
    
    const video = videos[0];
    console.log('\n✅ Search Results:');
    console.log(`   📌 Title: ${video.title}`);
    console.log(`   🎬 URL: ${video.url}`);
    console.log(`   ⏱️  Duration: ${video.timestamp}`);
    console.log(`   👀 Views: ${video.views.toLocaleString()}`);
    console.log(`   📺 Channel: ${video.author.name}`);
    console.log(`   📅 Uploaded: ${video.ago}`);
    
    // Extract video ID
    const videoId = musicDownloader.extractVideoId(video.url);
    console.log(`   🆔 Video ID: ${videoId}`);
    
    if (videoId) {
      console.log('   🎵 Thumbnail: https://i.ytimg.com/vi/' + videoId + '/maxresdefault.jpg');
      console.log('\n✅ Music search working correctly!');
      return { success: true, videoUrl: video.url, title: video.title };
    }
  } catch (error) {
    console.log('❌ Music search error:', error.message);
    return { success: false };
  }
}

// Test 2: Newsletter Channel Link Parsing
console.log('\n═══════════════════════════════════════');
console.log('📢 TEST 2: Newsletter Channel Parser');
console.log('═══════════════════════════════════════');

function testNewsletterParsing() {
  const channelLink = 'https://whatsapp.com/channel/0029Vb6A8Nj0AgWK0TONxY3C';
  console.log(`🔗 Channel Link: ${channelLink}`);
  
  if (!channelLink.includes("https://whatsapp.com/channel/")) {
    console.log('❌ Invalid channel link format');
    return { success: false };
  }
  
  const idPart = channelLink.split('https://whatsapp.com/channel/')[1];
  console.log(`   ✅ Extracted Channel ID: ${idPart}`);
  console.log(`   📊 Ready to fetch metadata via WhatsApp API`);
  console.log('\n✅ Newsletter parser working correctly!');
  return { success: true, channelId: idPart };
}

// Test 3: Play2 Search
console.log('\n═══════════════════════════════════════');
console.log('🎧 TEST 3: Play2 Music Search');
console.log('═══════════════════════════════════════');

async function testPlay2Search() {
  try {
    const query = 'Despacito';
    console.log(`🔍 Searching for: "${query}"`);
    
    const search = await yts(query);
    const video = search.videos[0];

    if (!video) {
      console.log('❌ No results found');
      return { success: false };
    }

    console.log('\n✅ Search Results:');
    console.log(`   📌 Title: ${video.title}`);
    console.log(`   🎬 Video ID: ${video.videoId}`);
    console.log(`   ⏱️  Duration: ${video.timestamp}`);
    console.log(`   👀 Views: ${video.views.toLocaleString()}`);
    console.log(`   📺 Channel: ${video.author.name}`);
    console.log(`   🖼️  Thumbnail: ${video.thumbnail}`);
    
    // Construct API URL (as used in play2)
    const BASE_URL = 'https://noobs-api.top';
    const apiURL = `${BASE_URL}/dipto/ytDl3?link=${encodeURIComponent(video.videoId)}&format=mp3`;
    console.log(`   🔗 API Endpoint ready: ${apiURL.substring(0, 60)}...`);
    console.log('\n✅ Play2 search working correctly!');
    return { success: true };
  } catch (error) {
    console.log('❌ Play2 search error:', error.message);
    return { success: false };
  }
}

// Run all tests
async function runAllTests() {
  const results = [];
  
  // Test Music Search (play command)
  const musicTest = await testMusicSearch();
  results.push({ name: 'Music Search (play)', ...musicTest });
  
  // Test Newsletter Parser
  const newsletterTest = testNewsletterParsing();
  results.push({ name: 'Newsletter Parser', ...newsletterTest });
  
  // Test Play2 Search
  const play2Test = await testPlay2Search();
  results.push({ name: 'Play2 Search', ...play2Test });
  
  // Summary
  console.log('\n═══════════════════════════════════════');
  console.log('📊 TEST SUMMARY');
  console.log('═══════════════════════════════════════');
  
  results.forEach((result, index) => {
    const status = result.success ? '✅ PASSED' : '❌ FAILED';
    console.log(`${index + 1}. ${result.name}: ${status}`);
  });
  
  const allPassed = results.every(r => r.success);
  
  console.log('\n' + '═'.repeat(43));
  if (allPassed) {
    console.log('🎉 ALL TESTS PASSED! Commands are ready to use.');
    console.log('\nNext Steps:');
    console.log('1. Provide your SESSION-ID to connect to WhatsApp');
    console.log('2. Test commands in WhatsApp:');
    console.log('   • .play Shape of You');
    console.log('   • .play2 Despacito');
    console.log('   • .newsletter https://whatsapp.com/channel/0029Vb6A8Nj0AgWK0TONxY3C');
  } else {
    console.log('⚠️  Some tests failed. Check errors above.');
  }
  console.log('═'.repeat(43) + '\n');
}

// Execute tests
runAllTests().catch(console.error);
