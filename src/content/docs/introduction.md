# Introduction

Power Interview is a privacy-first AI assistant that helps you perform confidently during live interviews, mock interviews, meetings, and business calls. It runs as a desktop application on your machine and combines real-time transcription, intelligent AI suggestions, and smart meeting export for Google Meet, Zoom, Microsoft Teams, and more - all designed to keep your data under your control.

| Normal Mode                                                                   | Stealth Mode                                                                          |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| ![Power Interview - Main Application Interface](/media/docs/app-overview.jpg) | ![Power Interview - Main Application Interface](/media/docs/app-overview-stealth.jpg) |

---

## What It Does

Power Interview listens to your interview conversation, transcribes it in real time, and surfaces contextual suggestions so you can respond with clarity. For technical roles, it can analyze coding problems on your screen and generate solution. For behavioral rounds, it draws on your profile - your name, CV, and the job description - to generate personalized, natural-sounding responses.

You can connect your own LLM provider (OpenAI, Anthropic, Groq, Google) using API keys you control. Depending on your plan, a default model is also included so you can get started instantly.

---

## Core Features

### Real-Time Transcription

- **Dual-Channel**: Your microphone captures your voice; system audio loopback captures the interviewer automatically
- Streams transcription live via WebSocket with low latency
- Each line is labeled by speaker (your name or "Interviewer") with a timestamp
- Auto-scroll keeps up with new lines; a toggle lets you pause and scroll back

### AI Reply Suggestions

- Generates interview answers personalized to your CV and job description
- Streams suggestions in real time as the conversation progresses
- Considers the full conversation context, not just the last question
- Produces human-like responses based on your profile

### AI Code Suggestions

- Captures one or multiple screenshots of your screen (up to 4) to read the problem
- Sends the screenshots to an AI model that generates a suggested solution
- Displays the result with syntax highlighting inside the app
- All triggered without ever switching focus away from your interview window

### Stealth Mode

- The Power Interview window is **always hidden from screen capture and screen share** - interviewers can never see it regardless of mode
- Stealth mode keeps the window from receiving focus, so your keyboard and mouse stay locked on your coding challenge or video call
- A minimal status bar shows running state, credit balance, and active hotkeys
- A toggleable low-opacity overlay lets you glance at suggestions without switching focus
- Entire workflow controllable by keyboard shortcuts - no mouse required, no lost focus

![Stealth mode status bar](/media/docs/stealth-mode.png)

### Smart Meeting Notes & Export

- After a meeting or interview session, export a complete AI-generated report as a Word document (`.docx`)
- Report includes a summary, timestamped transcript with speaker labels, action items, follow-up notes, and any reply suggestions
- Works across Google Meet, Zoom, Microsoft Teams, and other meeting platforms, so you can capture notes for both individuals and enterprise workflows

### Credits & Payments

- Credits are consumed while the assistant is running (AI suggestions and transcription)
- Credit balance is displayed live inside the app
- Buy credits directly from the **Buy Credits** page within the app, with payment history and status tracking

### Global Hotkeys

Every function in Power Interview is accessible from any window via keyboard shortcuts:

| Action                                      | Windows / Linux                 | macOS         |
| ------------------------------------------- | ------------------------------- | ------------- |
| Stop all & exit stealth                     | `Ctrl+Shift+Q`                  | `⌃⌥Q`         |
| Toggle stealth mode                         | `Ctrl+Shift+M`                  | `⌃⌥M`         |
| Toggle window opacity                       | `Ctrl+Shift+N`                  | `⌃⌥N`         |
| Toggle transcription dock                   | `Ctrl+Shift+F8`                 | `⌃⌥F8`        |
| Place window (numpad layout)                | `Ctrl+Shift+1` – `Ctrl+Shift+9` | `⌃⌥1` – `⌃⌥9` |
| Move window                                 | `Ctrl+Alt+Shift+Arrow`          | `⌃⌥⇧Arrow`    |
| Resize window                               | `Ctrl+Win+Shift+Arrow`          | `⌃⌥⌘Arrow`    |
| Zoom in/out or reset zoom                   | `Ctrl+Shift+[=, -, 0]`          | `⌃⌥[=, -, 0]` |
| Scroll live suggestions panel (down/up/end) | `Ctrl+Shift+[J, K, L]`          | `⌃⌥[J, K, L]` |
| Scroll triggered suggestions panel          | `Ctrl+Shift+[U, I, O]`          | `⌃⌥[U, I, O]` |
| Capture screen                              | `Ctrl+Shift+F9`                 | `⌃⌥F9`        |
| Clear captures                              | `Ctrl+Shift+F10`                | `⌃⌥F10`       |
| Trigger without captures                    | `Ctrl+Shift+F11`                | `⌃⌥F11`       |
| Trigger with captures                       | `Ctrl+Shift+F12`                | `⌃⌥F12`       |

On macOS the base modifier is **Control+Option** (`⌃⌥`) rather than `Ctrl+Shift`, because `Ctrl+Shift` combinations collide with system shortcuts there. `⇧` is Shift and `⌘` is Command.

---

## How It Is Built

Power Interview consists of three layers running together on your machine:

| Layer            | Technology                    | Purpose                                         |
| ---------------- | ----------------------------- | ----------------------------------------------- |
| Desktop UI       | Electron + React + TypeScript | User interface and configuration                |
| Desktop Runtime  | Electron                      | UI, local audio capture, and system integration |
| Backend Services | Cloud (separate)              | AI/LLM inference and ASR processing             |

The desktop client communicates with local services and with cloud services over secure channels. Transcripts and screenshots are sent to the backend only when you actively request a suggestion, and are not retained afterwards. Your interview configuration (full name, profile/CV, context) is stored with your account so it is available on every device you sign in to.

---

## Privacy at a Glance

- Your interview configuration (full name, profile/CV, and context) is saved to your account, so signing in on another device restores it
- Session tokens and device settings (audio device, window layout, scroll preferences) are stored on your machine by Electron Store, in your user profile folder
- Transcripts are not stored on external servers after a session ends

---

## What You Need

Before getting started, ensure you have the following:

- A Power Interview account (sign up at using the application)
- A Windows or macOS machine
- A working microphone and (optionally) webcam
