# Overview

Eclipse MD is an advanced WhatsApp bot built with Node.js and the Baileys library. It provides 300+ modular commands spanning AI chat, media processing, group management, games, utilities, and more. The bot features a plugin-based architecture where each command is a self-contained module, enabling easy maintenance and hot-reload support.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Core Framework
- **Platform**: WhatsApp via @whiskeysockets/baileys library
- **Runtime**: Node.js with ES modules (type: "module")
- **Entry Point**: index.js handles WebSocket connection and message routing
- **Configuration**: Centralized in config.js with environment variable overrides

## Command System
- **Plugin Architecture**: Commands stored in `eclipse-plug/` directory as independent modules
- **Command Structure**: Each command exports a default object with `name`, `description`, `execute()` function
- **Command Loader**: Dynamic import system loads all commands on startup
- **Prefix System**: Configurable command prefix (default: '.')
- **Hot Reload**: Commands can be added/removed without full restart

## Authentication & State Management
- **Session Storage**: Multi-file auth state using Baileys' useMultiFileAuthState
- **Session ID**: Configurable session identifier for auth persistence
- **Persistent Data**: JSON file-based storage in `data/` directory for:
  - User settings and preferences
  - Group configurations
  - Welcome/goodbye messages
  - Anti-link settings
  - Banned users list
  - Game states (trivia, hangman, etc.)
  - Message history for anti-delete (auto-cleared on bot restart)

## Message Processing Pipeline
1. Message received via WebSocket
2. Command prefix detection
3. Command name extraction and normalization
4. Command module lookup (supports aliases)
5. Permission validation (owner/admin checks)
6. Command execution with context injection
7. Error handling and user feedback

## Permission & Role System
- **Owner**: Defined via BOT_NUMBER environment variable or config.js
- **Moderators**: Stored in data/moderators.json
- **Banned Users**: Tracked in data/banned.json
- **Group Admins**: Validated via Baileys groupMetadata API

## Feature Modules

### Group Management
- Welcome/goodbye messages with customizable templates
- Anti-link detection with kick/delete/warn actions
- Admin commands (promote, demote, kick, add)
- Group settings (description, name, icon)
- Disappearing messages control
- Broadcast to all groups

### Media Processing
- Image effects (brightness, contrast, flip, colorize, dehaze)
- Audio effects (bass, deep voice)
- Sticker creation from images/text
- Media upload to catbox.moe
- Profile picture management

### AI Integration
- OpenAI GPT integration (gpt-3, ai2 commands)
- Google Gemini API support
- Chatbot with conversation memory
- Code execution in multiple languages

### Games & Entertainment
- Trivia with scoring system
- Hangman word game
- Character analysis
- Reaction GIF commands
- NSFW content (group-only)

### Utilities
- Dictionary lookup
- Bible/Quran verse retrieval
- Base64/binary encoding
- URL expansion
- Currency conversion
- Football/sports data

## Data Persistence Strategy
- **Format**: JSON files for simplicity and portability
- **Location**: `data/` directory
- **Load Pattern**: Synchronous file reads on command execution
- **Save Pattern**: Immediate writes after state changes
- **No Database**: File-based approach for lightweight deployment

## Error Handling
- Try-catch blocks around API calls
- Graceful degradation for missing API keys
- User-friendly error messages
- Network error detection with specific feedback
- Fallback responses for service unavailability

## Test Mode
- TEST_MODE_ONLY environment variable prevents WhatsApp connection
- Allows command loading verification without live connection
- Useful for development and debugging

# External Dependencies

## Required Services
- **WhatsApp**: Baileys library for WhatsApp Web protocol
- **OpenAI API**: GPT models for AI chat (requires API key in settings.js)
- **Google Gemini**: Alternative AI provider (requires API key)
- **Giphy API**: GIF search and reactions
- **Imgur**: Image hosting
- **Football Data API**: Sports statistics and fixtures
- **ExchangeRate API**: Currency conversion rates
- **Polygon.io API**: Forex market data

## Third-Party APIs
- mumaker: Logo generation service
- Catbox.moe: Media file hosting
- bible-api.com: Bible verse lookup
- dictionaryapi.dev: Word definitions
- newsapi.org: News aggregation
- waifu.pics: Anime images (NSFW content)

## Media Processing Libraries
- **Jimp**: Image manipulation (brightness, contrast, flip)
- **fluent-ffmpeg**: Audio/video processing
- **wa-sticker-formatter**: WhatsApp sticker creation
- **@distube/ytdl-core**: YouTube media download
- **archiver**: File compression

## Utilities
- **axios**: HTTP requests
- **cheerio**: HTML parsing
- **moment-timezone**: Date/time formatting
- **pino**: Logging
- **form-data**: Multipart form uploads
- **compile-run**: Code execution sandbox

## Missing Database
Currently uses JSON files for data storage. Consider adding MongoDB via mongoose (already in dependencies) for:
- Scalable message history
- User analytics
- Game leaderboards
- Chat logs