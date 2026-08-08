# Troubleshooting

This page covers the most common issues users encounter with Power Interview and how to resolve them.

---

## Installation & Startup

### The app does not launch after installation

**Possible causes and fixes:**

- **Missing runtime**: Ensure you are on a supported OS version (Windows 10/11 or macOS 13+).
- **Antivirus blocking**: Some antivirus programs quarantine desktop app binaries. Add the Power Interview installation folder to your antivirus exclusion list and try launching again.
- **Corrupted install**: Uninstall the app, delete any leftover files from `%AppData%\power-interview`, and reinstall.

### The app opens but shows a blank white screen

This typically means the renderer process failed to load.

- Restart the app.
- If running from source, ensure the Vite dev server started correctly on port 15173 before Electron attempted to connect to it.
- Check for Node.js version compatibility - Node.js 18 or higher is required.

---

## Authentication

### Cannot log in - "Invalid credentials" error

- Verify your email and password are correct at [powerinterviewai.com](https://www.powerinterviewai.com/).
- If you recently reset your password, use the new password. Old sessions may be cached; log out completely and log in again.
- Check that your internet connection is active.

### Session expires immediately after login

- Your system clock may be out of sync. JWT tokens are time-sensitive. Enable automatic date/time sync in your OS settings.

---

## Backend & Service Connectivity

### Cannot connect to the backend services

The app checks connectivity to backend services on startup and periodically during a session. If a service is unreachable, the relevant feature (transcription, AI suggestions) will not work.

**Steps to diagnose:**

1. Check your internet connection.
2. Visit [powerinterviewai.com](https://www.powerinterviewai.com/) in a browser to confirm the service is not under maintenance.
3. Check if a firewall or VPN is blocking outbound WebSocket connections (ports 443 or 8080 are typically used).
4. Disable your VPN temporarily and retry.

---

## Transcription

### No transcription appearing at all

1. Confirm the session is **started** (the Start button should show as active / Stop should be visible).
2. Open **Audio Options** from the control panel (microphone icon) and verify your physical microphone is selected.

   ![Audio Options - verify the correct microphone is selected](/media/docs/audio-options.png)

3. Speak and check if your operating-system audio settings show sound input from the selected device.
4. Ensure the backend is reachable - transcription is processed on the backend. Try visiting [powerinterviewai.com](https://www.powerinterviewai.com/) to rule out a service outage.
5. Restart the session.

### Only your voice is being transcribed (not the interviewer's)

The interviewer's voice is captured via system audio loopback - whatever is playing through your system speakers is automatically picked up. If the interviewer's channel is silent:

1. Make sure your video call is actually playing audio through your default playback device (e.g., not routing audio only to a secondary device).
2. Check your system volume mixer: the video call app's audio level should not be muted or at zero.
3. Restart the session after verifying audio is coming through the speakers.

### Transcription is inaccurate or garbled

- Move to a quieter environment or use a better microphone.
- Avoid speaking too quickly; natural pacing improves ASR accuracy significantly.
- Check whether background noise sources (fans, AC, keyboard) are being picked up by your microphone. Use a directional or noise-cancelling microphone.

### Transcription has significant delay

- A brief delay (1–3 seconds) is normal for streaming ASR. Longer delays indicate a network issue.
- Check your upload bandwidth. The transcription stream sends audio data continuously to the backend.
- If using a VPN, try disabling it or switching to a VPN server with lower latency.

---

## AI Suggestions

### No reply suggestions are generated

- Verify your **Profile** (CV / resume) and **Context** (job description) fields are filled in. The AI requires this information to generate useful responses.
- Confirm the backend is reachable (see [Cannot connect to the backend services](#cannot-connect-to-the-backend-services)).
- Ensure the session is active and transcription is running. Suggestions require conversation data.

### Suggestions are generic and not relevant to the interview

- Your **Profile** field may be too sparse. Add more detail about your experience, role history, and skills.
- Your **Context** field may not match the current interview. Update it with the actual job description before the interview starts.
- If you are interviewing for a technical role, include the specific tech stack in the context field.

### Suggestions are cut off mid-sentence

- This can happen when the session is stopped during streaming. Restart the session and request a new suggestion.
- Poor network conditions can interrupt streaming. Check your connection.

---

## Code Suggestions

### Screenshot capture produces a blank or black image

- Some applications use hardware acceleration that prevents software-level screen capture.
  - In Chrome/Edge: launch with `--disable-gpu-sandbox` or use the built-in window capture workaround.
  - For other apps: try taking a screenshot using your OS screenshot tool first to confirm the issue is application-specific.
- Ensure the target window is not minimized when you press `Ctrl+Shift+F9`.

### Code suggestion is incorrect or does not address the problem

- Capture additional screenshots that include edge cases, constraints, or sample I/O (`Ctrl+Shift+F9` for each).
- Clear the previous set of screenshots (`Ctrl+Shift+F10`) before capturing images for a new problem.
- Zoom into the relevant portion of the problem before capturing so the model receives higher-resolution text.

---

## Hotkeys

Shortcuts on this page are written in their Windows and Linux form. On macOS the base modifier is **Control+Option** (`⌃⌥`) instead of `Ctrl+Shift`, so `Ctrl+Shift+Q` is `⌃⌥Q`, and so on. See the [complete hotkey reference](/docs/usage) for both columns side by side.

### Hotkeys are not working

- Power Interview registers global hotkeys through Electron. Another application may already be using the same key combination.
  - Check for conflicting applications: screen recorders, game overlays, other productivity tools.
  - Quit potential conflicting apps and test whether the hotkeys register.
- On some systems, `Ctrl+Shift+1–9` may conflict with browser tab management shortcuts. Ensure your browser is not in focus trapping these keys.
- Restart Power Interview to re-register the hotkeys.

### Pressing `Ctrl+Shift+Q` closes the browser tab instead of the assistant

- This shortcut only fires correctly when Power Interview has successfully registered its global hotkey. If it is not registered (due to a conflict), the OS or foreground app may interpret the key combination instead.
- Use the Stop button in the UI as a fallback.

---

## Window Management

### The app window went off-screen and cannot be found

Use the window positioning shortcuts to bring it back:

- `Ctrl+Shift+5` - Center of the screen
- `Ctrl+Shift+1` - Bottom-left corner

If the window is still not visible, right-click the Power Interview icon in the taskbar and select **Move**, then use arrow keys to drag it into view.

---

## Data & Privacy

### I want to clear session data (transcripts and suggestions)

Click the **Clear** button (trash icon) in the control panel toolbar. This removes all transcripts, reply suggestions, and code suggestions from the current session. Your profile, credentials, and configuration are not affected.

### I want to sign out and remove my account data

Click the menu icon (☰) in the titlebar and select **Sign out**. Local data such as session tokens and device settings are managed by Electron Store in your user profile folder (`%AppData%\power-interview`). You can delete this folder manually after signing out to remove all locally stored data. Your interview configuration (full name, profile/CV, context) is stored with your account rather than in that folder, so it will be restored the next time you sign in.

### The app is logging me out automatically

Your session token may have expired. Log in again. If this happens repeatedly, check your system clock is synchronized correctly as session tokens rely on accurate timestamps.

---

## Getting Further Help

If none of the above resolves your issue:

- **Email**: [team@vectorleappulse.xyz](mailto:team@vectorleappulse.xyz)
- **Discord**: [discord.gg/TJJp5azK7Z](https://discord.gg/TJJp5azK7Z)
- **Telegram**: [t.me/power_interview_ai](https://t.me/power_interview_ai)
- **GitHub Issues**: Open an issue at [github.com/PowerInterviewAI/client-app](https://github.com/PowerInterviewAI/client-app)

When reporting a bug, include:

- Your operating system and version
- Power Interview version (shown in the app title bar or About screen)
- A description of what you expected vs. what happened
- Relevant logs from `%AppData%\power-interview\logs\` if available
