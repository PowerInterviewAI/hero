# Installation

This page covers how to install and run Power Interview on Windows and macOS.

---

## Option A - Install via Command Line

### Windows (PowerShell)

```powershell
$release = Invoke-RestMethod -Uri "https://api.github.com/repos/PowerInterviewAI/client-app/releases/latest"
$asset = $release.assets | Where-Object { $_.name -like "*Setup*.exe" } | Select-Object -First 1
Invoke-WebRequest -Uri $asset.browser_download_url -OutFile $asset.name
Start-Process ".\$($asset.name)"
```

### macOS (Terminal)

```bash
DMG_URL=$(curl -s https://api.github.com/repos/PowerInterviewAI/client-app/releases/latest | grep -Eo 'https://[^"]+\.dmg' | head -n 1)
curl -L "$DMG_URL" -o Power.Interview.AI.dmg
open "Power.Interview.AI.dmg"
```

These commands download the latest installer and open it immediately.

---

## Option B - Prebuilt Installer Download

Use the latest release binaries from GitHub:

- [Windows installer (.exe)](https://github.com/PowerInterviewAI/client-app/releases/latest/download/PowerInterviewAI-Setup-1.5.6.exe)
- [macOS installer (.dmg)](https://github.com/PowerInterviewAI/client-app/releases/latest/download/Power.Interview.AI-1.5.6-arm64.dmg)
- [All release assets (latest)](https://github.com/PowerInterviewAI/client-app/releases/latest)

After installation, launch **Power Interview**, sign in, and proceed to first-run setup.

---

## Option C - Run from Source

### System Requirements

| Requirement      | Minimum Version                                      |
| ---------------- | ----------------------------------------------------- |
| Operating System | Windows 10/11 or macOS 13+                             |
| Node.js          | 22.15+                                                 |
| pnpm             | 11+ (managed via `packageManager` in `package.json`)   |

### Setup

```bash
git clone https://github.com/PowerInterviewAI/client-app
cd client-app
pnpm install
pnpm electron:dev-show
```

`pnpm start` also works, but it launches the window hidden (stealth-first default) - use `electron:dev-show` for a visible window on first run.

---

## First-Run Setup

After launching the app for the first time:

1. **Sign in** with your Power Interview account.
2. **Open Configuration** from the menu icon (☰) in the titlebar.
3. **Set up your profile** (name, CV/resume, interview context).
4. **Select your microphone** in **Audio Options**.

After setup, click **Start** to begin a session.

