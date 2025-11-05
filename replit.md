# Overview

Eclipse MD is an advanced WhatsApp bot built on the Baileys library, featuring 300+ modular commands across multiple categories including AI chat, media processing, group management, games, and utility tools. The bot operates as a sophisticated automation system for WhatsApp with extensive plugin architecture and real-time message handling capabilities.

# User Preferences

Preferred communication style: Simple, everyday language.

# Recent Updates (November 5, 2025)

## New Features Added

1. **Combined Code Runner** (`eclipse-plug/coderunner.js`)
   - Unified command for running Python, JavaScript, Java, C, and C++ code
   - Helper library in `lib/codeRunner.js`
   - Usage: `.run <language> <code>`

2. **Sonu Music Generator** (`eclipse-plug/sonu.js`)
   - AI music generation from custom lyrics
   - Helper library in `lib/sonuMusicAPI.js`
   - Uses OmegaTech API
   - Returns audio file and cover art
   - Usage: `.sonu <lyrics> | <style> | <instrument>`

3. **Sora2 Video Generator** (`eclipse-plug/self/sora2.js`)
   - AI video generation from text prompts
   - Helper library in `lib/soraVideoAPI.js`  
   - Uses OmegaTech API (currently experiencing issues)
   - Self-mode command only
   - Usage: `.sora2 <prompt>`

4. **Shell Command Runner** (`eclipse-plug/shell.js`)
   - Execute terminal commands directly in WhatsApp
   - Special `$` prefix for shell commands (no bot prefix needed)
   - Helper library in `lib/shellRunner.js` with safety checks
   - Blocks dangerous commands (rm -rf, dd, shutdown, etc.)
   - Usage: `$<command>` or `.shell <command>`

5. **Updated Pair Command** (`eclipse-plug/pair.js`)
   - Now uses deployed pairing website: https://eclipse-session.onrender.com/pair
   - Simplified pairing process
   - Removed local pairing code generation
   - Usage: `.pair <phone_number>`

## Menu Updates

- Added "AI MUSIC GENERATOR" category with Sonu command
- Added Sora2 to "AI VIDEO GENERATOR" category
- Added new "SHELL COMMANDS" category
- Added unified `run` command to "CODE RUNNER & TOOLS"
- Updated plugin count from 343+28 to 348+29

# System Architecture

## Core Technology Stack

**Primary Framework**: Built on `@whiskeysockets/baileys` v6.7+ for WhatsApp Web API integration, using Node.js ES modules architecture.

**Runtime Environment**: Node.js with ES6+ module system (type: "module" in package.json), leveraging modern JavaScript features including async/await patterns and dynamic imports.

**State Management**: Multi-file authentication state using Baileys' built-in auth system, with persistent session storage via SESSION-ID mechanism.

## Plugin Architecture

**Modular Command System**: Commands are self-contained modules in `eclipse-plug/` directory, each exporting an object with:
- `name`: Command identifier
- `description`: Command purpose
- `aliases`: Alternative command names (optional)
- `execute`: Async function handling command logic

**Command Registration**: Dynamic command loading system that imports all `.js` files from `eclipse-plug/` at runtime, enabling hot-reload capability and easy extensibility.

**Command Categories**: Commands organized into logical categories (AI, Media, Group, Games, Utility) for better organization and menu generation.

## Message Processing Pipeline

**Message Flow**:
1. Baileys socket receives WhatsApp messages
2. Message routing identifies command prefix (default: ".")
3. Command dispatcher matches message to loaded plugin
4. Plugin executes with context (sock, args, settings)
5. Response sent back through Baileys socket

**Context Injection**: Commands receive standardized context object containing:
- `sock`: Baileys socket for message sending
- `args`: Parsed command arguments
- `settings`: Bot configuration from config.js
- `msg`: Original message object for quoting/replying

## Data Persistence

**JSON File Storage**: Bot uses file-based JSON storage for:
- User data (`data/usernames.json`, `data/scores.json`)
- Group settings (`data/welcome.json`, `data/antilinkSettings.json`)
- Bot configuration (`data/botSettings.json`)
- Moderation data (`data/banned.json`, `data/warns.json`)

**Rationale**: File-based storage chosen for simplicity and portability, avoiding database dependencies. Suitable for moderate-scale deployments where atomic writes and simple key-value lookups suffice.

**Library Integration**: `fs-extra` used for enhanced file operations with promises and atomic writes.

## AI Integration Layer

**Multi-Provider Strategy**: Bot integrates multiple AI services for redundancy:
- OpenAI GPT-4o-mini (primary AI chat)
- Google Gemini AI (alternative AI provider)
- GitHub Copilot API (code assistance)

**API Key Management**: Centralized in `settings.js` with environment variable fallbacks for security. Keys loaded at startup and injected into command context.

**Error Handling**: Graceful degradation when AI services unavailable, with user-friendly error messages distinguishing between auth errors (401), rate limits (429), and network failures.

## Media Processing

**Image Processing**: Jimp library for image manipulation (brightness, contrast, flip, colorize) with buffer-based operations for memory efficiency.

**Audio/Video Processing**: FFmpeg integration via multiple methods:
- `@ffmpeg-installer/ffmpeg`: Bundled FFmpeg binary
- `fluent-ffmpeg`: High-level FFmpeg wrapper
- Direct `exec` calls for specialized audio effects (bass, deep voice)

**Sticker Generation**: `wa-sticker-formatter` for creating WhatsApp stickers from images/text with metadata (pack name, author).

**Download Pipeline**: Media downloaded from WhatsApp using Baileys' `downloadMediaMessage`, processed in-memory or temp files, then sent back.

## Group Management Features

**Permission System**: Admin-check utilities (`lib/isAdmin.js`) verify group admin status before executing privileged commands (promote, demote, antilink).

**Anti-Link Protection**: Configurable link detection with actions (delete, warn, kick) stored per-group in `data/antilinkSettings.json`.

**Welcome/Goodbye Messages**: Template-based greeting system with variable substitution (@user, @group, @desc, @count).

**Auto-Moderation**: Warn tracking system with threshold-based auto-kick, stored in `data/warns.json`.

## Real-Time Features

**Auto-Reply Systems**:
- Chatbot mode with conversation memory (last 5 messages per user)
- Auto-reactions to status updates
- Auto-typing/recording indicators
- Auto-view messages/statuses

**Message Deletion Detection**: `antidelete.js` stores messages in JSON, detects revocations via Baileys message update events, resends deleted content.

**Anti-Call Protection**: Detects voice/video calls, auto-rejects based on settings in `data/botSettings.json`.

# External Dependencies

## WhatsApp Integration

**Baileys Library**: Core dependency for WhatsApp Web protocol implementation. Handles authentication, message sending/receiving, group operations, and media handling.

## AI Services

**OpenAI API**: Primary AI chat provider using GPT-4o-mini model. Requires API key configured in `settings.js`.

**Google Generative AI**: Google Gemini integration via `@google/generative-ai` package for alternative AI responses.

## Media APIs

**YouTube**: `@distube/ytdl-core` for YouTube video/audio downloads. Used in audio.js command for music downloads.

**Giphy API**: GIF search and retrieval for reaction commands. API key configured in settings.

**Imgur API**: Image hosting service integration for uploading and sharing images.

**Catbox.moe**: Free file hosting service for media uploads without authentication requirements.

## External Web Services

**Football Data API**: Real-time sports data for UEFA Champions League (standings, scores, news) via `api.football-data.org`.

**Dictionary API**: Free dictionary service at `api.dictionaryapi.dev` for word definitions.

**Exchange Rate APIs**: Currency conversion data from `exchangerate-api.com` for forex commands.

**News API**: News aggregation for forex/sports news (NewsAPI.org integration).

## Development Tools

**Code Execution**: `compile-run` package enables running Python, JavaScript, Java, C, C++ code snippets in sandboxed environments.

**Obfuscation**: `javascript-obfuscator` for code protection (potential use in deployment).

**Web Scraping**: Cheerio (jQuery-like HTML parsing) and JSDOM for web content extraction.

## Utility Libraries

**Date/Time**: `moment-timezone` for timezone-aware date formatting, `date-fns` for date manipulation.

**Logging**: Pino logger for structured logging with minimal overhead.

**HTTP Client**: Axios for external API requests with timeout and retry logic.

**File Operations**: `fs-extra` for enhanced file system operations, `archiver` for creating zip archives.

## Optional Services

**MongoDB**: Mongoose integration available but not actively used (included in dependencies for future scalability).

**Email**: Nodemailer configured but not actively used in current command set.

**Socket.io**: WebSocket server capability (included but not utilized in current architecture).