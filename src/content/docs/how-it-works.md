# How It Works

This page explains the high-level architecture of Power Interview: what runs on your machine, what runs in the cloud, and how core features are delivered in real time.

---

## Overview

Power Interview has three layers:

1. **Desktop App** - interface, session controls, settings, and local state
2. **Local Runtime** - audio capture and OS-level integrations
3. **Cloud Services** - transcription, LLM inference, and account/payment APIs

Together these layers provide low-latency transcription, suggestion streaming, and export workflows. Device settings stay on your machine; your interview configuration is saved to your account so it follows you across devices.

---

## Component Diagram

![Architecture overview - components and connections](/media/docs/architecture-diagram.svg)

---

## Desktop App

The desktop app is built with Electron + React and includes:

- Authentication and account management
- Configuration storage (profile, CV, context, preferences)
- Live session state (running status, transcript, suggestions, captures)
- UI panels for transcription, reply suggestions, and code suggestions
- Stealth mode and hotkey-driven controls

---

## Audio and Transcription Flow

During a session, the app captures:

- Your microphone input
- System audio loopback (interviewer audio)

Both streams are sent for real-time transcription. Partial and final transcript updates are reflected in the UI as they arrive.

---

## Suggestion Flow

### Reply Suggestions

When new transcript context is available, the app sends relevant context (transcript + profile + job context) to the LLM service and streams suggestions back to the UI.

### Code Suggestions

When you capture screenshots, the app sends them to the code suggestion service, then streams generated responses into the code panel with formatting.

---

## Data Storage

Persistent local data includes:

- Login/session tokens
- Profile information (name, CV, context)
- User preferences (theme, selected devices, UI behavior)

Session transcript/suggestion content is retained in memory for the active app session and exported only when requested.

---

## Session Lifecycle

1. User clicks **Start**
2. App validates required configuration
3. Audio capture and transcription begin
4. Transcript and suggestions stream live into the UI
5. User clicks **Stop** (or uses hotkey)
6. Session stops and UI returns to idle state

---

## Credits System

Credits are consumed while AI-assisted features are active (including transcription and suggestion generation). Credit balance is refreshed periodically during a running session and updates after successful payments.

