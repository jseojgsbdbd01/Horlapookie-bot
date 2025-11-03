# Eclipse MD WhatsApp Bot

## Overview

Eclipse MD is an advanced WhatsApp bot built on the Baileys library, featuring 300+ modular commands spanning AI interactions, media processing, group management, gaming, and utility functions. The bot operates as a multi-purpose chat assistant with extensive automation capabilities, designed to enhance WhatsApp group and private chat experiences.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Core Bot Framework

**WhatsApp Connection Layer**
- Built on `@whiskeysockets/baileys` v6.7.19 for WhatsApp Web protocol
- Multi-file authentication state management for session persistence
- Auto-reconnection logic with disconnect reason handling
- Pino logger for structured logging and debugging
- Test mode capability (`TEST_MODE_ONLY=true`) to load commands without connecting to WhatsApp

**Message Processing Pipeline**
- Command prefix system (configurable via `BOT_PREFIX` environment variable, defaults to `.`)
- Modular command loader from `eclipse-plug/` directory
- Message type detection (text, image, audio, video, document)
- Context-aware message handling (replies, mentions, quoted messages)
- Global configuration accessible to all command modules

**Configuration Management**
- Centralized config via `config.js` and `settings.js`
- Environment variable support for sensitive data (bot owner, prefix, session ID)
- Global accessibility of bot configuration across all modules
- Persistent data storage in JSON files under `data/` directory

### Command Architecture

**Modular Command System**
- Each command is a self-contained ES6 module in `eclipse-plug/`
- Standard command interface with `name`, `description`, `aliases`, `category`, and `execute()` method
- Hot-reload support for development
- Category-based organization (AI, Media, Group, Games, Utility, etc.)
- Permission-based execution (owner-only, admin-only, moderator access)

**Command Categories**
1. **AI & Automation**: OpenAI GPT integration, Gemini AI, chatbot with memory
2. **Media Processing**: Audio effects (bass, deep voice), image manipulation (flip, brightness, contrast), sticker creation
3. **Group Management**: Admin controls, antilink, auto-greet, welcome/goodbye messages, disappearing messages
4. **Content Generation**: Logo makers, text effects, QR codes, carbon code images
5. **Information Services**: Dictionary, Bible/Quran verses, forex/currency data, football stats
6. **Utilities**: Base64 encoding, binary conversion, URL expansion, encryption/decryption

### Data Persistence

**File-Based Storage**
- JSON files in `data/` directory for persistent state
- Stores: user settings, group configurations, banned users, moderators, game scores, message history
- Async file operations with error handling
- In-memory caching for frequently accessed data (chatbot memory, user info)

**Key Data Files**
- `botSettings.json`: Bot mode, auto-reactions, typing indicators, view status
- `antilinkSettings.json`: Per-group antilink rules (kick/delete/warn)
- `welcomeConfig.json`: Customizable welcome/goodbye messages per group
- `banned.json`: Banned user list with timestamps
- `moderators.json`: Bot moderator numbers
- `antidelete_messages.json`: Message backup for anti-delete feature

### Media Processing

**Image Manipulation**
- Jimp library for image effects (brightness, contrast, flip, colorize, dehaze)
- Sticker creation via `wa-sticker-formatter` with metadata support
- Profile picture management (download, update with full-size support)
- AI-powered image enhancement (dehaze, colorize) using external APIs

**Audio/Video Processing**
- FFmpeg for audio effects (bass boost, deep voice, pitch modification)
- YouTube download support via `@distube/ytdl-core`
- Audio format conversion and compression
- Voice note support with push-to-talk flags

### Group Management Features

**Permission System**
- Three-tier access: Owner, Admin, Moderator
- Owner number configured via environment variable
- Admin detection via WhatsApp group metadata
- Moderator list stored in `data/moderators.json`

**Anti-Abuse Mechanisms**
- Antilink detection with configurable actions (delete, kick, warn)
- Anti-delete message recovery with media backup
- Anti-call blocking (voice/video calls)
- Bad word filtering per group
- User warn/ban system with persistent tracking

**Automation Features**
- Auto-greet on member join/leave with customizable messages
- Auto-view status updates
- Auto-react to messages and statuses
- Auto-typing and recording indicators
- Scheduled broadcast to all groups

### Gaming & Interactive Features

**Built-in Games**
- Hangman with persistent scores
- Trivia questions with timed answers
- Quiz system with score tracking
- Word games and reaction commands

**Social Interactions**
- Reaction GIF commands (slap, kiss, hug, etc.)
- Character analysis tool
- Random image generators (SFW/NSFW categories)

## External Dependencies

### AI Services
- **OpenAI GPT-4**: Chat completions via official SDK (configured in `settings.js`)
- **Google Gemini AI**: Alternative AI provider for questions and automation
- **Copilot API**: Third AI option for chat interactions

### Media APIs
- **Giphy API**: GIF search and retrieval for reaction commands
- **Imgur API**: Image hosting for uploaded media
- **Mumaker**: Logo and text effect generation
- **Carbon API**: Code snippet to image conversion

### Data Providers
- **ExchangeRate API**: Currency conversion and forex data
- **Polygon.io API**: Forex market status and news
- **Football-Data.org API**: UEFA Champions League stats, standings, scores
- **Dictionary API**: Word definitions and pronunciations
- **Bible/Quran APIs**: Verse retrieval by chapter and number

### Infrastructure Services
- **Catbox.moe**: Free file hosting for media uploads
- **NewsAPI**: News articles for various topics
- **YouTube Data**: Video search and metadata via `yt-search`

### Core Libraries
- **Baileys**: WhatsApp Web protocol implementation
- **Express**: Web server (v5.1.0) for potential webhook support
- **Axios**: HTTP client for API requests
- **Cheerio**: HTML parsing for web scraping
- **Mongoose**: MongoDB ODM (prepared for database migration)
- **Socket.io**: Real-time communication infrastructure
- **Nodemailer**: Email notifications support
- **Archiver**: File compression for backups

### Utilities
- **date-fns/moment-timezone**: Date formatting and timezone handling
- **fluent-ffmpeg**: Video/audio processing wrapper
- **jsdom**: DOM manipulation for web content parsing
- **jsonwebtoken**: Authentication token generation
- **javascript-obfuscator**: Code protection
- **pastebin-js**: Code sharing via Pastebin

### Notes
- The bot currently uses file-based JSON storage but includes Mongoose, suggesting plans for MongoDB migration
- Session authentication may use Mega.nz credentials (configured in `settings.js`) for cloud backup
- Multiple AI providers configured as fallback options for resilience
- API keys stored in `settings.js` (should be migrated to environment variables for security)