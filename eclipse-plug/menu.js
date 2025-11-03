import fs from "fs";
import os from "os";
import config from "../config.js";
import { channelInfo } from "../lib/channelConfig.js";
import { mediaUrls } from "../lib/mediaUrls.js";
import { menuButtonsConfig, menuButtons } from "../lib/menuButtons.js";
import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

export default {
name: 'menu',
description: 'Display bot menu with all commands',
aliases: ['help', 'commands'],
async execute(msg, { sock, args, settings }) {
const from = msg.key.remoteJid;
const prefix = config.prefix;
const botName = config.botName;
const ownerName = config.ownerName;

// Detect platform
const platform = os.platform();
const platformName = {
  'linux': 'Linux',
  'darwin': 'macOS',
  'win32': 'Windows',
  'android': 'Android'
}[platform] || platform.charAt(0).toUpperCase() + platform.slice(1);

// Get total command count dynamically
const totalCommands = (global.commands?.size || 342) + (global.selfCommands?.size || 28);

// Get current time and date
const now = new Date();
const timeOptions = {
  timeZone: 'Africa/Lagos',
  hour12: true,
  hour: 'numeric',
  minute: '2-digit',
  second: '2-digit'
};
const dateOptions = {
  timeZone: 'Africa/Lagos',
  day: 'numeric',
  month: 'numeric',
  year: 'numeric'
};

const currentTime = now.toLocaleTimeString('en-US', timeOptions);
const currentDate = now.toLocaleDateString('en-US', dateOptions);

// Bot uptime calculation
const uptime = process.uptime();
const hours = Math.floor(uptime / 3600);
const minutes = Math.floor((uptime % 3600) / 60);
const seconds = Math.floor(uptime % 60);
const uptimeString = `${hours}h ${minutes}m ${seconds}s`;

// Memory usage
const memUsage = process.memoryUsage();
const usedMemory = Math.round((memUsage.heapUsed / 1024 / 1024) * 100) / 100;
const totalMemory = Math.round((memUsage.heapTotal / 1024 / 1024) * 100) / 100;
const memoryPercent = Math.round((usedMemory / totalMemory) * 100);

const menuText = `╔╭━━〔 *𝔼𝕔𝕝𝕚𝕡𝕤𝕖 𝕄𝔻* 〕━━╮

│ ✦ Mᴏᴅᴇ : ${global.botMode || 'public'}
│ ✦ Pʀᴇғɪx : [ ${prefix} ]
│ ✦ Usᴇʀ : @${msg.key.remoteJid.split('@')[0]}
│ ✦ Pʟᴜɢɪɴs : ${totalCommands}
│ ✦ Vᴇʀsɪᴏɴ : 2.0
│ ✦ Uᴘᴛɪᴍᴇ : ${uptimeString}
│ ✦ Tɪᴍᴇ Nᴏᴡ : ${currentTime}
│ ✦ Dᴀᴛᴇ Tᴏᴅᴀʏ : ${currentDate}
│ ✦ Pʟᴀᴛғᴏʀᴍ : ${platformName}
│ ✦ Tɪᴍᴇ Zᴏɴᴇ : Africa/Lagos
│ ✦ Sᴇʀᴠᴇʀ Rᴀᴍ : ${memoryPercent}% Used
╰─────────────────╯

╭━━━✦❮ 🛠️ BASIC TOOLS ❯✦━⊷
┃✪  ${prefix}echo
┃✪  ${prefix}log
┃✪  ${prefix}ping
┃✪  ${prefix}profile
┃✪  ${prefix}setusername
┃✪  ${prefix}time
┃✪  ${prefix}uptime
┃✪  ${prefix}userinfo
╰━━━━━━━━━━━━━━━━━⊷

╭━━━✦❮ 📢 CHANNEL TOOLS ❯✦━⊷
┃✪  ${prefix}newsletter
╰━━━━━━━━━━━━━━━━━⊷

╭━━━✦❮ 👥 GROUP MANAGEMENT ❯✦━⊷
┃✪  ${prefix}announce
┃✪  ${prefix}info
┃✪  ${prefix}grouplink
┃✪  ${prefix}getallmembers
┃✪  ${prefix}broadcast
┃✪  ${prefix}chatbot
┃✪  ${prefix}delete
┃✪  ${prefix}demote
┃✪  ${prefix}gdesc
┃✪  ${prefix}gname
┃✪  ${prefix}gpt4
┃✪  ${prefix}groupinfo
┃✪  ${prefix}kick
┃✪  ${prefix}lock
┃✪  ${prefix}promote
┃✪  ${prefix}remove
┃✪  ${prefix}tagall
┃✪  ${prefix}unlock
┃✪  ${prefix}open
┃✪  ${prefix}warn
┃✪  ${prefix}welcome
┃✪  ${prefix}goodbye
┃✪  ${prefix}antilink
┃✪  ${prefix}groupmanage
╰━━━━━━━━━━━━━━━━━⊷

╭━━━✦❮ FOREX TOOLS ❯✦━⊷
┃✪  ${prefix}currencylist
┃✪  ${prefix}forex
┃✪  ${prefix}fxexchange
┃✪  ${prefix}fxpairs
┃✪  ${prefix}fxstatus
┃✪  ${prefix}stocktickers
╰━━━━━━━━━━━━━━━━━⊷

╭━━━✦❮ 🤖 AI COMMANDS ❯✦━⊷
┃✪  ${prefix}gpt-3
┃✪  ${prefix}copilot
┃✪  ${prefix}gpt4
┃✪  ${prefix}ai2
┃✪  ${prefix}translate
┃✪  ${prefix}google
┃✪  ${prefix}gta
┃✪  ${prefix}gpt2
┃✪  ${prefix}bing
╰━━━━━━━━━━━━━━━━━⊷

╭━━━✦❮ 🎨 IMAGE GENERATOR ❯✦━⊷
┃✪  ${prefix}pollination
┃✪  ${prefix}grok
┃✪  ${prefix}vision
┃✪  ${prefix}remini
┃✪  ${prefix}colorize
┃✪  ${prefix}dehaze
┃✪  ${prefix}bing (self)
╰━━━━━━━━━━━━━━━━━⊷

╭━━━✦❮ 🎬 AI VIDEO GENERATOR ❯✦━⊷
┃✪  ${prefix}sora (self)
╰━━━━━━━━━━━━━━━━━⊷

╭━━━✦❮ 🎙️ VOICE & AUDIO ❯✦━⊷
┃✪  ${prefix}stt
┃✪  ${prefix}tts
╰━━━━━━━━━━━━━━━━━⊷

╭━━━✦❮ 🎮 GAMES & FUN ❯✦━⊷
┃✪  ${prefix}answer
┃✪  ${prefix}brutal
┃✪  ${prefix}character
┃✪  ${prefix}hangman
┃✪  ${prefix}joke
┃✪  ${prefix}myscore
┃✪  ${prefix}quiz
┃✪  ${prefix}riddle
┃✪  ${prefix}roll
┃✪  ${prefix}ship
┃✪  ${prefix}trivia
┃✪  ${prefix}shayari
┃✪  ${prefix}roseday
┃✪  ${prefix}hack (self)
╰━━━━━━━━━━━━━━━━━⊷

╭━━━✦❮ 🐺 WEREWOLF GAME ❯✦━⊷
┃✪  ${prefix}wolf create
┃✪  ${prefix}wolf join
┃✪  ${prefix}wolf start
┃✪  ${prefix}wolf players
┃✪  ${prefix}wolf vote [number]
┃✪  ${prefix}wolf exit
┃✪  ${prefix}wolf role
╰━━━━━━━━━━━━━━━━━⊷

╭━━━✦❮ 🔗 WORD CHAIN GAMES ❯✦━⊷
┃✪  ${prefix}wcg
┃✪  ${prefix}wcg start
┃✪  ${prefix}wcg end
┃✪  ${prefix}wcg <word>
┃✪  ${prefix}wrg
┃✪  ${prefix}wrg start
┃✪  ${prefix}wrg end
┃✪  ${prefix}wrg <word>
╰━━━━━━━━━━━━━━━━━⊷

╭━━━✦❮ 🎨 CREATIVITY & ART ❯✦━⊷
┃✪  ${prefix}quote
┃✪  ${prefix}wallpaper
╰━━━━━━━━━━━━━━━━━⊷

╭━━━✦❮ 👤 PERSONAL STUFF ❯✦━⊷
┃✪  ${prefix}getpp
╰━━━━━━━━━━━━━━━━━⊷

╭━━━✦❮ ✨ IMAGE EFFECTS ❯✦━⊷
┃✪  ${prefix}resize
┃✪  ${prefix}rotate
┃✪  ${prefix}brightness
┃✪  ${prefix}contrast
┃✪  ${prefix}flip
┃✪  ${prefix}greyscale
┃✪  ${prefix}bw
┃✪  ${prefix}invert
┃✪  ${prefix}negative
┃✪  ${prefix}sepia
╰━━━━━━━━━━━━━━━━━⊷

╭━━━✦❮ 🏷️ STICKER CREATOR ❯✦━⊷
┃✪  ${prefix}attp
┃✪  ${prefix}emojimix
┃✪  ${prefix}photo2
┃✪  ${prefix}scrop2
┃✪  ${prefix}gif
┃✪  ${prefix}simage
┃✪  ${prefix}sticker
┃✪  ${prefix}sticker2
┃✪  ${prefix}take2
┃✪  ${prefix}url2
┃✪  ${prefix}write2
╰━━━━━━━━━━━━━━━━━⊷

╭━━━✦❮ 🎵 MUSIC & MEDIA ❯✦━⊷
┃✪  ${prefix}play
┃✪  ${prefix}play2
┃✪  ${prefix}song
┃✪  ${prefix}lyric
┃✪  ${prefix}audio
┃✪  ${prefix}video
┃✪  ${prefix}pexel
┃✪  ${prefix}avatar
┃✪  ${prefix}yt video
┃✪  ${prefix}yt audio
╰━━━━━━━━━━━━━━━━━⊷

╭━━━✦❮ 🆕 NEWLY ADDED <under fixing ❯✦━⊷
┃✪  ${prefix}shazam
┃✪  ${prefix}song2
┃✪  ${prefix}fancy
┃✪  ${prefix}privacy
┃✪  ${prefix}privacysettings
┃✪  ${prefix}pin
┃✪  ${prefix}unpin
┃✪  ${prefix}star
┃✪  ${prefix}unstar
┃✪  ${prefix}onwa
┃✪  ${prefix}checkid
┃✪  ${prefix}checkno
┃✪  ${prefix}wacheck
┃✪  ${prefix}archive
┃✪  ${prefix}archivechat
╰━━━━━━━━━━━━━━━━━⊷

╭━━━✦❮ 📥 DOWNLOADERS ❯✦━⊷
┃✪  ${prefix}tiktok
┃✪  ${prefix}facebook
┃✪  ${prefix}instagram
┃✪  ${prefix}twitter
┃✪  ${prefix}yt
╰━━━━━━━━━━━━━━━━━⊷

╭━━━✦❮ 🔞 NSFW ❯✦━⊷
┃✪  ${prefix}blowjob
┃✪  ${prefix}hentai
┃✪  ${prefix}hentaivid
┃✪  ${prefix}hneko
┃✪  ${prefix}hwaifu
┃✪  ${prefix}trap
┃✪  ${prefix}xvideo
┃✪  ${prefix}xx1
┃✪  ${prefix}xx2
┃✪  ${prefix}xxv1
┃✪  ${prefix}xxv2
╰━━━━━━━━━━━━━━━━━⊷

╭━━━✦❮ ☠️ BUG/CRASH COMMANDS ❯✦━⊷
┃✪  ${prefix}crash (self)
┃✪  ${prefix}xioscrash (self)
┃✪  ${prefix}pmbug (self)
┃✪  ${prefix}unlimitedbug (self)
╰━━━━━━━━━━━━━━━━━⊷

╭━━━✦❮ 🔐 ENCRYPTION & SECURITY ❯✦━⊷
┃✪  ${prefix}base64
┃✪  ${prefix}decrypt
┃✪  ${prefix}hash
╰━━━━━━━━━━━━━━━━━⊷

╭━━━✦❮ 🐙 GITHUB TOOLS ❯✦━⊷
┃✪  ${prefix}gitcommits
┃✪  ${prefix}gitforks
┃✪  ${prefix}github
┃✪  ${prefix}gitissues
┃✪  ${prefix}gitpulls
┃✪  ${prefix}gitreleases
┃✪  ${prefix}gitrepo
┃✪  ${prefix}repo
┃✪  ${prefix}gitsearch
┃✪  ${prefix}gitstats
┃✪  ${prefix}gittrending
╰━━━━━━━━━━━━━━━━━⊷

╭━━━✦❮ 🎨 LOGO CREATORS ❯✦━⊷
┃✪  ${prefix}fire
┃✪  ${prefix}neon
┃✪  ${prefix}hacker
┃✪  ${prefix}dragonball
┃✪  ${prefix}naruto
┃✪  ${prefix}didong
┃✪  ${prefix}wall
┃✪  ${prefix}summer
┃✪  ${prefix}neonlight
┃✪  ${prefix}greenneon
┃✪  ${prefix}glitch
┃✪  ${prefix}devil
┃✪  ${prefix}boom
┃✪  ${prefix}water
┃✪  ${prefix}snow
┃✪  ${prefix}transformer
┃✪  ${prefix}thunder
┃✪  ${prefix}phub
┃✪  ${prefix}harrypotter
┃✪  ${prefix}foggyglass
┃✪  ${prefix}whitegold
┃✪  ${prefix}lightglow
┃✪  ${prefix}thor
┃✪  ${prefix}pubg
┃✪  ${prefix}avatar
┃✪  ${prefix}aov
┃✪  ${prefix}castle
┃✪  ${prefix}dragon
┃✪  ${prefix}overwatch
┃✪  ${prefix}pentakill
┃✪  ${prefix}purple
┃✪  ${prefix}gold
┃✪  ${prefix}arena
┃✪  ${prefix}incandescent
┃✪  ${prefix}comic3d
┃✪  ${prefix}blackpink
┃✪  ${prefix}silver3d
┃✪  ${prefix}colorneon
┃✪  ${prefix}balloon3d
┃✪  ${prefix}paint3d
┃✪  ${prefix}wetglass
╰━━━━━━━━━━━━━━━━━⊷

╭━━━✦❮ 🖋️ TATTOO EFFECTS ❯✦━⊷
┃✪  ${prefix}tattoo
┃✪  ${prefix}arrowtattoo
╰━━━━━━━━━━━━━━━━━⊷

╭━━━✦❮ 🔍 SEARCH & INFO ❯✦━⊷
┃✪  ${prefix}dictionary
┃✪  ${prefix}images
╰━━━━━━━━━━━━━━━━━⊷

╭━━━✦❮ 💡 UTILITY TOOLS ❯✦━⊷
┃✪  ${prefix}blacklist
┃✪  ${prefix}menu
┃✪  ${prefix}save
┃✪  ${prefix}vv
┃✪  ${prefix}owner
╰━━━━━━━━━━━━━━━━━⊷

╭━━━✦❮ 🔗 URL TOOLS ❯✦━⊷
┃✪  ${prefix}catbox
┃✪  ${prefix}expand
┃✪  ${prefix}qrcode
┃✪  ${prefix}shorten
┃✪  ${prefix}urlcheck
┃✪  ${prefix}urlpreview
╰━━━━━━━━━━━━━━━━━⊷

╭━━━✦❮ 🙏 RELIGIOUS & SPIRITUAL ❯✦━⊷
┃✪  ${prefix}quran
┃✪  ${prefix}bible
┃✪  ${prefix}holybook
┃✪  ${prefix}biblelist
┃✪  ${prefix}holybooks
┃✪  ${prefix}surah
╰━━━━━━━━━━━━━━━━━⊷

╭━━━✦❮ 🔄 BOT MODES ❯✦━⊷
┃✪  ${prefix}mode
╰━━━━━━━━━━━━━━━━━⊷

╭━━━✦❮ ℹ️ BOT INFO ❯✦━⊷
┃✪  ${prefix}xmd
┃✪  ${prefix}alive
┃✪  ${prefix}online
┃✪  ${prefix}status
╰━━━━━━━━━━━━━━━━━⊷

╭━━━✦❮ 🔧 OTHER COMMANDS ❯✦━⊷
┃✪  ${prefix}keepon
┃✪  ${prefix}keepoff
┃✪  ${prefix}qr
┃✪  ${prefix}reboot
┃✪  ${prefix}trt2
┃✪  ${prefix}checkupdate
┃✪  ${prefix}update
╰━━━━━━━━━━━━━━━━━⊷

╭━━━✦❮ 🔄 AUTOMATION COMMANDS ❯✦━⊷
┃✪  ${prefix}autoreact (self)
┃✪  ${prefix}autorecording (self)
┃✪  ${prefix}autotyping (self)
┃✪  ${prefix}autoviewstatus (self)
┃✪  ${prefix}autogreet (self)
╰━━━━━━━━━━━━━━━━━⊷

╭━━━✦❮ 🛡️ ANTI-COMMANDS ❯✦━⊷
┃✪  ${prefix}anticall (self)
┃✪  ${prefix}antidelete (self)
┃✪  ${prefix}antilink
┃✪  ${prefix}antibug
┃✪  ${prefix}cleartmp (self)
╰━━━━━━━━━━━━━━━━━⊷

╭━━━✦❮ 📁 FILE MANAGEMENT ❯✦━⊷
┃✪  ${prefix}datafile (self)
┃✪  ${prefix}files (self)
╰━━━━━━━━━━━━━━━━━⊷

╭━━━✦❮ ⚙️ SELF SETTINGS ❯✦━⊷
┃✪  ${prefix}settings (self)
┃✪  ${prefix}emojitoggle (self)
┃✪  ${prefix}goodmorning
┃✪  ${prefix}goodnight
╰━━━━━━━━━━━━━━━━━⊷

╭━━━✦❮ 🤖 SELF MODE COMMANDS ❯✦━⊷
┃✪  ${prefix}block (self)
┃✪  ${prefix}fullpp (self)
┃✪  ${prefix}unblock (self)
┃✪  ${prefix}vv2 (self)
╰━━━━━━━━━━━━━━━━━⊷

╭━━━✦❮ 📸 SCREENSHOTS ❯✦━⊷
┃✪  ${prefix}jpg
┃✪  ${prefix}png
┃✪  ${prefix}screenscrop
┃✪  ${prefix}screenshot
┃✪  ${prefix}screenswidth
╰━━━━━━━━━━━━━━━━━⊷

╭━━━✦❮ 🖼️ IMAGE SEARCH & GENERATION ❯✦━⊷
┃✪  ${prefix}image
┃✪  ${prefix}messi
╰━━━━━━━━━━━━━━━━━⊷

╭━━━✦❮ ⚽ FOOTBALL LIVE ❯✦━⊷
┃✪  ${prefix}cl_matchday
┃✪  ${prefix}cl_news
┃✪  ${prefix}cl_table
┃✪  ${prefix}cl_top_scorer
┃✪  ${prefix}liga_portugal_highlights
┃✪  ${prefix}liga_portugal_matchday
┃✪  ${prefix}liga_portugal_news
┃✪  ${prefix}liga_portugal_table
┃✪  ${prefix}liga_portugal_top_assist
┃✪  ${prefix}liga_portugal_top_scorer
┃✪  ${prefix}wc_matchday
┃✪  ${prefix}wc_news
┃✪  ${prefix}wc_table
┃✪  ${prefix}wc_top_scorer
╰━━━━━━━━━━━━━━━━━⊷

╭━━━✦❮ 💻 CODE RUNNER & TOOLS ❯✦━⊷
┃✪  ${prefix}carbon
┃✪  ${prefix}C
┃✪  ${prefix}run-carbon
┃✪  ${prefix}debinary
┃✪  ${prefix}decode
┃✪  ${prefix}decodebinary
┃✪  ${prefix}ebinary
┃✪  ${prefix}encode
┃✪  ${prefix}encodebinary
┃✪  ${prefix}obfuscate
┃✪  ${prefix}obfu
┃✪  ${prefix}run-c
┃✪  ${prefix}runcc
┃✪  ${prefix}runc
┃✪  ${prefix}run-c++
┃✪  ${prefix}c++
┃✪  ${prefix}runc++
┃✪  ${prefix}run-java
┃✪  ${prefix}java
┃✪  ${prefix}runjava
┃✪  ${prefix}run-js
┃✪  ${prefix}node
┃✪  ${prefix}javascript
┃✪  ${prefix}run-py
┃✪  ${prefix}python
┃✪  ${prefix}runpy
┃✪  ${prefix}scrap
┃✪  ${prefix}get
┃✪  ${prefix}find
┃✪  ${prefix}web
┃✪  ${prefix}inspectweb
┃✪  ${prefix}webinspect
┃✪  ${prefix}webscrap
╰━━━━━━━━━━━━━━━━━⊷

> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ${config.botName}©`;

// Send menu with image and proper context info (includes both channel and external ad reply)
    const messageOptions = {
      image: { url: mediaUrls.menuImage },
      caption: menuText,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          ...channelInfo.contextInfo.forwardedNewsletterMessageInfo
        },
        externalAdReply: {
          ...menuButtonsConfig.externalAdReply
        }
      }
    };

    try {
      await sock.sendMessage(from, messageOptions, { quoted: msg });
    } catch (error) {
      console.log('[MENU] Error sending menu:', error.message);
      // Fallback to text only with same context
      await sock.sendMessage(from, {
        text: menuText,
        contextInfo: messageOptions.contextInfo
      }, { quoted: msg });
    }

}
};

