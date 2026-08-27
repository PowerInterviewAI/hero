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

### Windows (Command Prompt)

`curl.exe` ships built into Windows 10/11, but cmd.exe has no built-in JSON parser, so this shells out to PowerShell to read the release info:

```bat
powershell -Command "$release = Invoke-RestMethod -Uri 'https://api.github.com/repos/PowerInterviewAI/client-app/releases/latest'; $asset = $release.assets | Where-Object { $_.name -like '*Setup*.exe' } | Select-Object -First 1; Invoke-WebRequest -Uri $asset.browser_download_url -OutFile $asset.name; Start-Process -FilePath ('.\' + $asset.name)"
```

### macOS (Terminal)

Works on both Apple Silicon (arm64) and Intel (x86_64) - the command picks the matching build from `uname -m`:

```bash
DMGS=$(curl -fsSL https://api.github.com/repos/PowerInterviewAI/client-app/releases/latest | grep -Eo 'https://[^"]+\.dmg')
if [ "$(uname -m)" = "arm64" ]; then
  DMG_URL=$(printf '%s\n' "$DMGS" | grep -- '-arm64\.dmg' | head -n 1)
else
  DMG_URL=$(printf '%s\n' "$DMGS" | grep -v -- '-arm64\.dmg' | head -n 1)
fi
curl -L "$DMG_URL" -o Power.Interview.AI.dmg
open "Power.Interview.AI.dmg"
```

As of v1.6.3, both builds carry an arch tag (`-arm64` or `-x64`) in their filename, which is why the Intel branch filters `-arm64` out instead of matching on `x86_64`.

If you want a specific version rather than the newest one, set `VERSION` and the
download URL can be built directly (it is seeded below with the current release):

```bash
VERSION={{version}}
SUF="-x64"; [ "$(uname -m)" = "arm64" ] && SUF="-arm64"
DMG="Power.Interview.AI-$VERSION$SUF.dmg"
curl -L -o "$DMG" "https://github.com/PowerInterviewAI/client-app/releases/download/v$VERSION/$DMG"
open "$DMG"
```

These commands download the latest installer and open it immediately.

Release builds are ad-hoc signed but not notarized, so macOS may report the app as damaged or blocked on first launch. Drag it to Applications, then run `xattr -cr "/Applications/Power Interview AI.app"`, or right-click the app and choose Open.

---

## Option B - Prebuilt Installer Download

Use the latest release binaries from GitHub:

- [Windows installer (.exe)]({{downloadWindows}})
- [macOS installer - Apple Silicon (.dmg)]({{downloadMacArm}})
- [macOS installer - Intel (.dmg)]({{downloadMacIntel}})
- [All release assets (latest)](https://github.com/PowerInterviewAI/client-app/releases/latest)

| Windows                                                                     | macOS                                                                       |
| --------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| ![Running the Windows installer](/media/docs/install-windows.png) | ![Dragging Power Interview AI into the Applications folder](/media/docs/install-macos.png) |

Not sure which Mac you have? Run `uname -m` in Terminal: `arm64` is Apple Silicon, `x86_64` is Intel.

After installation, launch **Power Interview**, sign in, and proceed to first-run setup.

---

## Option C - Run from Source

### System Requirements

| Requirement      | Minimum Version                                      |
| ---------------- | ---------------------------------------------------- |
| Operating System | Windows 10/11 or macOS 13+                           |
| Node.js          | 22.15+                                               |
| pnpm             | 11+ (managed via `packageManager` in `package.json`) |

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

![First-run setup - sign in and complete your profile](/media/docs/first-run-setup.png)

After launching the app for the first time:

1. **Sign in** with your Power Interview account.
2. **Open Configuration** from the menu icon (☰) in the titlebar.
3. **Set up your profile** (name, CV/resume, interview context).
4. **Select your microphone** in **Audio Options**.

After setup, click **Start** to begin a session.
