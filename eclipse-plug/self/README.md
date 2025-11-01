# 🔐 𝔼𝕔𝕝𝕚𝕡𝕤𝕖 𝕄𝔻 Bot - Owner Commands

<div align="center">

<!-- Animated Typing Effect -->
![Typing SVG](https://readme-typing-svg.demolab.com/?lines=RESTRICTED+OWNER+COMMANDS;FULL+CONTROL+PANEL;DANGEROUS+USE+WITH+CAUTION&font=Fira+Code&color=FF0000&size=24&center=true&vCenter=true&width=900&height=50&duration=4000&pause=1000)

</div>

## ⚠️ WARNING

```
╔═══════════════════════════════════════════════╗
║  ⚠️  OWNER-ONLY COMMANDS - RESTRICTED ACCESS  ║
╠═══════════════════════════════════════════════╣
║  These commands have FULL BOT CONTROL         ║
║  • Can modify system settings                 ║
║  • Can execute dangerous operations           ║
║  • Can cause bot crashes if misused           ║
║  • Only accessible to bot owner               ║
╚═══════════════════════════════════════════════╝
```

---

<div align="center">

## 🎯 Available Owner Commands

![Typing SVG](https://readme-typing-svg.demolab.com/?lines=ADVANCED+CONTROL+FEATURES;SYSTEM+ADMINISTRATION;DEBUG+AND+MONITORING&font=Fira+Code&color=FFC107&size=20&center=true&vCenter=true&width=700&height=40&duration=3000&pause=1000)

</div>

### 🛡️ Security & Protection Commands

#### `antibug.js` - Anti-Spam Protection
```bash
Usage: .antibug on/off
Description: Enable/disable spam protection system
Features:
  • Blocks rapid message spam (2 msg/sec limit)
  • Auto-blocks spammers
  • Prevents crash/bug attacks
  • Protects bot from malicious messages
Environment Variable: None (file-based config)

⚠️ Owner Only: Yes
```

#### `anticall.js` - Anti-Call Protection
```bash
Usage: .anticall on/off
Description: Automatically reject and block incoming calls
Features:
  • Auto-rejects voice/video calls
  • Blocks caller automatically
  • Sends notification to owner
  • Prevents call spam
Environment Variable: None (file-based config)

⚠️ Owner Only: Yes
```

#### `antidelete.js` - Anti-Delete Messages
```bash
Usage: .antidelete on/off
Description: Save and restore deleted messages
Features:
  • Captures deleted texts
  • Saves deleted media
  • Stores edit history
  • Forwards deleted messages to owner
Environment Variable: None (file-based config)

⚠️ Owner Only: Yes
⚠️ Privacy Warning: Use ethically
```

#### `block.js` / `unblock.js` - User Management
```bash
Usage: .block @user
       .unblock @user
Description: Block/unblock specific users from using bot
Features:
  • Prevent specific users from sending commands
  • Maintain blocklist across sessions
  • Quick access control

⚠️ Owner Only: Yes
```

---

### 🤖 Automation Commands

#### `autoreact.js` - Auto React System
```bash
Usage: .autoreact on/off
Description: Automatically react to messages
Features:
  • Random emoji reactions
  • Customizable reaction emojis
  • Group/DM specific settings
Environment Variable: AUTO_REACT (true/false)
Render Dashboard: Can be changed via environment variables

⚠️ Owner Only: Yes
```

#### `autotyping.js` - Auto Typing Indicator
```bash
Usage: .autotyping on/off
Description: Show typing indicator automatically
Features:
  • Natural conversation simulation
  • Configurable delay timing
  • Per-chat settings
Environment Variable: AUTO_TYPING (true/false)
Render Dashboard: Can be changed via environment variables

⚠️ Owner Only: Yes
```

#### `autorecording.js` - Auto Recording Indicator
```bash
Usage: .autorecording on/off
Description: Show voice recording indicator
Features:
  • Simulates voice message recording
  • Customizable timing
  • Chat-specific control
Environment Variable: AUTO_RECORDING (true/false)
Render Dashboard: Can be changed via environment variables

⚠️ Owner Only: Yes
```

#### `autoviewstatus.js` - Auto View Status
```bash
Usage: .autoviewstatus on/off
Description: Automatically view WhatsApp statuses
Features:
  • Auto-view all statuses
  • Silent viewing mode
  • Configurable auto-react
Environment Variable: AUTO_VIEW_STATUS (true/false), AUTO_REACT_STATUS (true/false), AUTO_STATUS_EMOJI
Render Dashboard: Can be changed via environment variables

⚠️ Owner Only: Yes
```

#### Auto View Message (No dedicated command)
```bash
Description: Automatically view view-once messages
Environment Variable: AUTO_VIEW_MESSAGE (true/false)
Render Dashboard: Can be changed via environment variables
Note: This is controlled via environment variable only

⚠️ Owner Only: Yes
```

#### `autogreet.js` - Auto Greeting System
```bash
Usage: .autogreet <action> [time] [message]
Actions:
  • .autogreet set <HH:MM> <message> - Set auto greeting
  • .autogreet list - Show all scheduled greetings
  • .autogreet delete <id> - Remove greeting
  • .autogreet on/off - Enable/disable system
Description: Schedule automatic greeting messages
Features:
  • Time-based auto messages
  • Multiple greetings per day
  • Supports mentions and formatting
  • Timezone: Africa/Lagos (WAT)
Environment Variable: None (file-based config)

⚠️ Owner Only: Yes
```

---

### 📁 Data Management Commands

#### `datafile.js` - Data File Management
```bash
Usage: .datafile <action> <filename>
Description: Manage bot data files
Features:
  • View data files
  • Edit configurations
  • Backup/restore data
  • Clear cache

⚠️ Owner Only: Yes
⚠️ Danger Level: HIGH
```

#### `files.js` - File System Access
```bash
Usage: .files <path>
Description: Browse and manage bot files
Features:
  • List directory contents
  • Read file contents
  • Delete files
  • Upload/download files

⚠️ Owner Only: Yes
⚠️ Danger Level: HIGH
```

---

### 🔧 System Commands

#### `settings.js` - Bot Settings Manager
```bash
Usage: .settings <option> <value>
Description: Configure bot settings
Features:
  • Change bot prefix
  • Update bot name
  • Modify owner number
  • Configure API keys
  • Adjust bot mode (public/self)

⚠️ Owner Only: Yes
⚠️ Danger Level: MEDIUM
```

#### `emoji-toggle.js` - Emoji Configuration
```bash
Usage: .emojitoggle <emoji> <setting>
Description: Configure bot emojis
Features:
  • Custom success emoji
  • Custom error emoji
  • Custom processing emoji
  • Reset to defaults

⚠️ Owner Only: Yes
```

---

### 🎨 Advanced Features

#### `fullpp.js` - Full Profile Picture
```bash
Usage: .fullpp @user
Description: View full-resolution profile pictures
Features:
  • High-quality PP download
  • View deleted/changed PPs
  • Save to device

⚠️ Owner Only: Yes
```

#### `vv2.js` - View Once Media Viewer
```bash
Usage: Reply to view-once media with .vv2
Description: Save view-once images/videos
Features:
  • Capture disappearing media
  • Save to storage
  • Forward to owner

⚠️ Owner Only: Yes
⚠️ Privacy Warning: Use responsibly
```

---

### ⚡ Developer Commands

#### `bing.js` - Bing AI Integration
```bash
Usage: .bing <prompt>
Description: Advanced AI with Bing integration
Features:
  • Web-connected AI responses
  • Real-time information
  • Image generation
  • Creative mode

⚠️ Owner Only: Yes
```

#### `hack.js` - Simulated Hacking
```bash
Usage: .hack @user
Description: Fake hacking animation (for fun)
Features:
  • Terminal-style animation
  • Progress indicators
  • Entertainment purposes only

⚠️ Owner Only: Yes
⚠️ Note: This is just for fun, not real hacking
```

---

### 🚨 DANGEROUS Commands

#### `crash.js` - Bot Crash Test
```bash
Usage: .crash
Description: Intentionally crash the bot for testing
Features:
  • Test crash recovery
  • Debug restart mechanisms
  • Emergency shutdown

⚠️ Owner Only: Yes
⚠️ Danger Level: EXTREME
⚠️ WARNING: This will CRASH the bot!
```

#### `pmbug.js` - Private Message Bug
```bash
Usage: .pmbug <number> <amount>
Description: Send rapid messages (bug testing)
Features:
  • Stress test messaging system
  • Debug message handling
  • Test rate limits

⚠️ Owner Only: Yes
⚠️ Danger Level: EXTREME
⚠️ WARNING: Can cause temporary WhatsApp restrictions!
```

#### `unlimitedbug.js` - Unlimited Bug Messages
```bash
Usage: .unlimitedbug <target>
Description: Send unlimited rapid messages
Features:
  • Extreme stress testing
  • Performance debugging

⚠️ Owner Only: Yes
⚠️ Danger Level: EXTREME
⚠️ WARNING: Can crash WhatsApp! Use only for testing!
```

#### `xioscrash.js` - Xios Crash Attack
```bash
Usage: .xioscrash <target>
Description: Advanced crash testing mechanism

⚠️ Owner Only: Yes
⚠️ Danger Level: EXTREME
⚠️ WARNING: Very dangerous! Testing purposes only!
```

#### `cleartmp.js` - Clear Temporary Files
```bash
Usage: .cleartmp
Description: Delete all files in tmp directory
Features:
  • Free up storage space
  • Clean cached media
  • Remove temporary data

⚠️ Owner Only: Yes
⚠️ Danger Level: MEDIUM
⚠️ Note: Cannot be undone
```

---

<div align="center">

## 🔐 Access Control

![Typing SVG](https://readme-typing-svg.demolab.com/?lines=PROTECTED+BY+OWNER+VERIFICATION;ONLY+YOU+CAN+USE+THESE;UNAUTHORIZED+ACCESS+BLOCKED&font=Fira+Code&color=9C27B0&size=18&center=true&vCenter=true&width=700&height=40&duration=3500&pause=1000)

</div>

### How Authorization Works

```javascript
// Bot verifies owner by phone number
const ownerNumber = config.ownerNumber; // From config.js
const isOwner = senderNumber === ownerNumber;

// Self commands ONLY execute if isOwner = true
if (!isOwner) {
  return "❌ Unauthorized. Owner only command.";
}
```

### Your Owner Number
```
📱 Owner: 2348028336218 (from config.js)
```

---

<div align="center">

## 💡 Usage Guidelines

</div>

### ✅ DO:
- Use for bot administration
- Test in private chats first
- Keep settings backed up
- Monitor bot behavior
- Use with caution

### ❌ DON'T:
- Share owner access with others
- Use crash command in production
- Abuse privacy-invading features
- Modify files without backup
- Execute unknown code

---

<div align="center">

## 📊 Command Statistics

</div>

```
Total Owner Commands: 17
Security Commands:    4
Automation Commands:  4
Data Management:      2
System Commands:      2
Advanced Features:    2
Dangerous Commands:   2
Developer Commands:   1
```

---

<div align="center">

## ⚠️ Safety Reminders

![Typing SVG](https://readme-typing-svg.demolab.com/?lines=BACKUP+DATA+BEFORE+CHANGES;TEST+IN+SAFE+ENVIRONMENT;USE+RESPONSIBLY&font=Fira+Code&color=F44336&size=18&center=true&vCenter=true&width=700&height=40&duration=3500&pause=1000)

</div>

### Before Using These Commands:
1. ✅ **Backup your data** - Save important files
2. ✅ **Read documentation** - Understand what it does
3. ✅ **Test safely** - Try in test environment
4. ✅ **Monitor effects** - Watch for issues
5. ✅ **Have restore plan** - Know how to undo

### Emergency Contacts:
- **Creator WhatsApp**: +234 912 222 2622
- **Email**: horlapookie@gmail.com
- **GitHub**: @horlapookie

---

<div align="center">

**Owner Commands - Use Wisely**

![Typing SVG](https://readme-typing-svg.demolab.com/?lines=WITH+GREAT+POWER+COMES+RESPONSIBILITY;CREATED+BY+HORLAPOOKIE&font=Fira+Code&color=00BCD4&size=20&center=true&vCenter=true&width=700&height=50&duration=3000&pause=1000)

*These commands give you complete control over your bot.*  
*Use them responsibly and ethically.*

</div>
