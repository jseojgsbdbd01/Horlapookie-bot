# Eclipse MD - WhatsApp Bot

## Overview
Eclipse MD is an advanced WhatsApp bot with 300+ commands built using the Baileys library. It provides AI conversations, media processing, group management, entertainment, and utility tools.

## Project Structure
- `index.js` - Main bot entry point and message handler
- `config.js` - Bot configuration (prefix, owner number, bot name)
- `settings.js` - API keys configuration
- `eclipse-plug/` - Command plugins organized by category
- `lib/` - Utility libraries and helper functions
- `data/` - JSON data files for bot state and settings

## Current State
- Project imported from GitHub
- Dependencies installed successfully
- Running in Replit environment

## Configuration
The bot uses environment variables with fallback to config.js:
- `BOT_PREFIX` - Command prefix (default: `.`)
- `BOT_NUMBER` - Owner WhatsApp number
- `BOT_NAME` - Bot display name
- `BOT_OWNER_NAME` - Owner name
- `BOT_SESSION_DATA` - WhatsApp session ID
- `OPENAI_API_KEY` - OpenAI API key (optional)
- `GEMINI_API_KEY` - Google Gemini API key (optional)

## Recent Changes
- 2025-11-08: Project imported to Replit
- 2025-11-08: Dependencies installed with --legacy-peer-deps flag

## Architecture
- **Backend**: Node.js WhatsApp bot (no frontend)
- **Host**: Runs on localhost (console application)
- **Port**: No web server required
- **Type**: Long-running console process

## User Preferences
- Owner: horlapookie
- WhatsApp: +234 912 222 2622
- Email: horlapookie@gmail.com

## Known Issues
- Commands to fix: .sora2, .sonu, .pair, .video, .shell
