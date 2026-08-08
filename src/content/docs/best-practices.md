# Best Practices

> **Be Careful:**
>
> Always start the Power Interview Assistant **before** joining the call so transcription and suggestions are ready from the first question.
>
> Getting the most from Power Interview requires more than just turning it on. The following practices will help you achieve accurate transcription, relevant AI suggestions, and a seamless interview experience.
>
> Shortcuts below are written in their Windows and Linux form. On macOS the base modifier is **Control+Option** (`⌃⌥`) instead of `Ctrl+Shift`, so `Ctrl+Shift+M` is `⌃⌥M`. See the [complete hotkey reference](/docs/usage) for both columns side by side.

---

## Profile & Context Setup

### Write a Detailed CV / Profile

The quality of AI reply suggestions depends directly on the detail in your profile. A one-line summary produces generic answers. A thorough profile produces relevant, personalized ones.

**Do:**

- Include your job titles, years of experience, and key responsibilities
- List specific technologies, frameworks, and languages you know
- Mention notable projects with measurable outcomes
- Include soft skills and working preferences when relevant

**Avoid:**

- Pasting a raw PDF-extracted text with garbled formatting
- Leaving the profile field empty or with placeholder text

### Tailor the Context to Each Interview

The **Context** field (job description / role requirements) directly shapes the tone and subject matter of reply suggestions. Before each interview:

1. Click the menu icon (☰) in the titlebar and select **Configuration**.
2. Replace the previous job description with the one from the current role.
3. Highlight the key skills the role requires - the AI will weight those more heavily.

The more aligned your context is to the actual interview, the more targeted and useful the suggestions will be.

---

## Audio Setup

### Use a Dedicated Microphone

The built-in laptop microphone often picks up keyboard sounds, fan noise, and room echo, all of which reduce transcription accuracy. A USB headset or desktop microphone with noise cancellation produces significantly better results.

### How Interviewer Audio is Captured

Power Interview captures the interviewer's voice via system audio loopback - it reads whatever audio is playing through your system speakers automatically. No extra routing software is needed for transcription to work for both channels.

### Test Audio Before the Interview

Run a short test session a few minutes before the interview starts:

- Speak a few sentences and verify your voice appears in the transcript.
- Play a short audio clip through your speakers and verify the loopback channel picks it up.
- If the microphone channel is missing, re-check that your physical microphone is selected in **Audio Options**.

---

## Code Suggestion Workflow

### Capture Multiple Angles of the Problem

A single screenshot of a long problem statement often misses important details. Use up to four screenshots to cover:

- The full problem description
- Sample inputs and expected outputs
- Any relevant constraints or examples below the fold

Press `Ctrl+Shift+F9` for each capture, then `Ctrl+Shift+F11` to submit (use `Ctrl+Shift+F10` to clear captures if you make a mistake).

---

## Stealth Mode & Window Placement

The Power Interview window is always excluded from screen capture and screen share - interviewers cannot see it regardless of where it is placed or whether stealth mode is on.

### Set Up Your Window Position Before the Interview

Decide where the Power Interview window will sit on your screen before the interview begins. Use `Ctrl+Shift+1–9` to snap it to your preferred screen zone. The bottom-right or top-right corners are often least intrusive.

Position it so it is:

- Visible to you at a glance
- Not overlapping the content you need to look at (your IDE, the interviewer's video)

### Enable Stealth Mode During Coding Challenges

Turn on stealth mode (`Ctrl+Shift+M`) whenever you need to type or interact with your IDE without the Power Interview window accidentally capturing focus. This keeps your keystrokes going to the right place.

### Use a Dual-Monitor Setup

If you have two monitors, run your video call on one screen and Power Interview on the other for maximum comfort - the assistant is always on a separate display.

### Practice Hotkeys Beforehand

The hotkey shortcuts are the core interface during an interview. Practice them before your interview so they feel natural:

- Scroll through suggestions without looking at the keyboard
- Capture and submit a screenshot from memory
- Toggle stealth mode and opacity without hesitation

Any fumbling with shortcuts during an interview will be distracting and costly.

---

## Pre-Interview Checklist

Before every interview, run through this checklist:

- [ ] Profile (name, CV) is up to date
- [ ] Context field has the correct job description for this role
- [ ] **Power Interview is started before joining the meeting**
- [ ] Microphone is selected and producing transcript output (test session run)
- [ ] Power Interview window is positioned and hotkeys tested

---

## Ethical Use

Use it responsibly:

- AI suggestions are a starting point - adapt them in your own words. Parroting a suggestion verbatim can appear unnatural.
- Ensure your use complies with the terms of service of the platform hosting the interview and with any applicable laws in your jurisdiction.
