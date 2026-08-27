#!/usr/bin/env python3
"""Build the hero carousel posters from real frames of the demo clips.

Each poster is a still lifted straight out of the mp4 it fronts - never a mock -
then downscaled to 1920x1080 and annotated: a topic chip so the three
near-identical coding clips are told apart at a glance, and callout boxes
pointing at what actually matters in the frame.

The posters are what a viewer sees when autoplay is suppressed (reduced-motion,
Data Saver), so they have to carry the clip on their own. The carousel already
prints each clip's title and description in the figcaption below the video, so
the text drawn here deliberately does NOT repeat it.

    python scripts/generate-posters.py [name-fragment ...]

Needs ffmpeg on PATH and Pillow (pip install pillow). Run it from the repo root.
Frame timestamps were picked by eye - see TIMESTAMP notes on each entry.
"""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
MEDIA = ROOT / "public" / "media"
OUT_DIR = MEDIA / "marketing"

W, H = 1920, 1080

# Brand tokens, read off --primary in src/styles/index.css (dark mode,
# hsl(30 96% 58%)). Keep these in step if the theme moves.
ORANGE = (251, 148, 45)
INK = (14, 12, 10)
WHITE = (255, 255, 255)
DIM = (198, 193, 186)

FONTS = Path("C:/Windows/Fonts")
F_SEMIBOLD = FONTS / "seguisb.ttf"
F_BOLD = FONTS / "segoeuib.ttf"
F_REGULAR = FONTS / "segoeui.ttf"


def font(path: Path, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(path), size)


# Boxes and chips are given in fractions of the frame so they stay readable
# next to the screenshots they were measured against.
def px(box: tuple[float, float, float, float]) -> tuple[int, int, int, int]:
    x0, y0, x1, y1 = box
    return (int(x0 * W), int(y0 * H), int(x1 * W), int(y1 * H))


POSTERS = [
    {
        "clip": "live-interview-assistant.mp4",
        "out": "poster-live-interview.jpg",
        # TIMESTAMP 90s: the suggestion panel is full on the laptop while the
        # second monitor shows the same call being shared - the whole pitch in
        # one frame.
        "t": 90,
        "chip": "LIVE INTERVIEW",
        "callouts": [
            {
                "box": (0.185, 0.345, 0.525, 0.735),
                "label": "Suggestions on your screen",
                "side": "below",
            },
            {
                # The Chrome window being shared, echoed back into the call by
                # Meet - the overlay is nowhere in it. That absence is the point.
                "box": (0.556, 0.297, 0.910, 0.605),
                "label": "Invisible in the shared window",
                "side": "below",
            },
        ],
    },
    {
        "clip": "coding-challenge-1.mp4",
        "out": "poster-coding-1.jpg",
        # TIMESTAMP 42s: Keys and Rooms open on the left, the overlay's Code
        # panel holding the DFS solution on the right.
        "t": 42,
        "chip": "GRAPH TRAVERSAL",
        "callouts": [
            {
                "box": (0.484, 0.185, 0.740, 0.565),
                "label": "Solution in the stealth overlay",
                "side": "below",
            },
        ],
    },
    {
        "clip": "coding-challenge-2.mp4",
        "out": "poster-coding-2.jpg",
        # TIMESTAMP 30s: findCircleNum - Number of Provinces - being typed out
        # against the overlay.
        "t": 30,
        "chip": "CONNECTED COMPONENTS",
        "callouts": [
            {
                "box": (0.492, 0.185, 0.722, 0.430),
                "label": "Read the answer, keep typing",
                "side": "below",
            },
        ],
    },
    {
        "clip": "coding-challenge-3.mp4",
        "out": "poster-coding-3.jpg",
        # TIMESTAMP 42s: the level-order walk over TreeNode, scrolled entirely
        # with hotkeys.
        "t": 42,
        "chip": "BINARY TREE",
        "callouts": [
            {
                "box": (0.498, 0.205, 0.700, 0.470),
                "label": "Scrolled with hotkeys alone",
                "side": "below",
            },
        ],
    },
]


def grab_frame(clip: str, t: int) -> Image.Image:
    """Pull a single frame at t seconds, full source resolution."""
    src = MEDIA / clip
    if not src.exists():
        raise SystemExit(f"missing clip: {src}")

    proc = subprocess.run(
        # -ss before -i seeks on keyframes, which is both fast and exact enough
        # here; -f image2pipe keeps the frame out of the working tree.
        ["ffmpeg", "-v", "error", "-ss", str(t), "-i", str(src),
         "-frames:v", "1", "-f", "image2pipe", "-vcodec", "png", "-"],
        capture_output=True,
    )
    if proc.returncode != 0 or not proc.stdout:
        raise SystemExit(f"ffmpeg failed on {clip}: {proc.stderr.decode(errors='replace')}")

    import io

    return Image.open(io.BytesIO(proc.stdout)).convert("RGB")


def scrim(size: tuple[int, int], depth: float, alpha: int) -> Image.Image:
    """Black gradient down from the top edge, fading out over `depth` of the frame.

    It exists for the topic chip - these frames are shot against a pale wall, so
    an orange pill on bare backdrop has nothing to sit on.
    """
    w, h = size
    grad = Image.new("L", (1, h), 0)
    end = int(depth * h)
    for y in range(end):
        t = 1 - y / max(1, end)
        grad.putpixel((0, y), int(alpha * t * t))
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 255))
    layer.putalpha(grad.resize((w, h)))
    return layer


def chip(draw: ImageDraw.ImageDraw, xy: tuple[int, int], text: str,
         fnt: ImageFont.FreeTypeFont, fill, fg, pad=(20, 12), radius=10,
         border=None, anchor_bottom=False) -> tuple[int, int, int, int]:
    """Rounded pill with centred text. Returns the box it occupied."""
    x, y = xy
    l, t, r, b = draw.textbbox((0, 0), text, font=fnt)
    tw, th = r - l, b - t
    w = tw + pad[0] * 2
    h = th + pad[1] * 2
    if anchor_bottom:
        y -= h
    box = (x, y, x + w, y + h)
    draw.rounded_rectangle(box, radius=radius, fill=fill,
                           outline=border, width=2 if border else 0)
    draw.text((x + pad[0] - l, y + pad[1] - t), text, font=fnt, fill=fg)
    return box


def build(spec: dict) -> Path:
    frame = grab_frame(spec["clip"], spec["t"])
    base = frame.resize((W, H), Image.LANCZOS).convert("RGBA")

    # These are handheld camera shots of a screen - a light knock-down keeps the
    # annotations readable without making the still look switched off.
    base.alpha_composite(Image.new("RGBA", (W, H), (10, 8, 6, 38)))
    base.alpha_composite(scrim((W, H), 0.26, 190))

    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)

    f_label = font(F_SEMIBOLD, 27)
    f_chip = font(F_BOLD, 25)

    for call in spec["callouts"]:
        x0, y0, x1, y1 = px(call["box"])
        draw.rounded_rectangle((x0, y0, x1, y1), radius=16,
                               outline=ORANGE + (235,), width=4)

        # Leader drops out of the box's bottom-left (or rises from its top) into
        # the label, so the eye goes box -> line -> words.
        cx = x0 + 46
        if call["side"] == "below":
            ly = y1 + 46
            draw.line((cx, y1, cx, ly), fill=ORANGE + (235,), width=4)
            label_xy = (cx - 24, ly)
        else:
            ly = y0 - 46
            draw.line((cx, y0, cx, ly), fill=ORANGE + (235,), width=4)
            label_xy = (cx - 24, ly)

        draw.ellipse((cx - 7, (y1 if call["side"] == "below" else y0) - 7,
                      cx + 7, (y1 if call["side"] == "below" else y0) + 7),
                     fill=ORANGE + (255,))
        chip(draw, label_xy, call["label"], f_label,
             fill=(12, 10, 8, 225), fg=WHITE, border=ORANGE + (140,),
             anchor_bottom=call["side"] == "above")

    # Topic chip, top left. The carousel caption already carries the full
    # title, so this stays a short topic tag rather than repeating it.
    chip(draw, (72, 60), spec["chip"], f_chip,
         fill=ORANGE + (255,), fg=INK, radius=8)

    out = OUT_DIR / spec["out"]
    # JPEG, not PNG: these are camera frames and the poster is the hero's LCP
    # element. The same image lands ~4.7x lighter here, and q88 keeps the
    # annotation text clean of ringing.
    Image.alpha_composite(base, layer).convert("RGB").save(
        out, "JPEG", quality=88, optimize=True, progressive=True
    )
    return out


def main() -> None:
    wanted = sys.argv[1:]
    made = 0
    for spec in POSTERS:
        if wanted and not any(w in spec["out"] for w in wanted):
            continue
        path = build(spec)
        print(f"{path.relative_to(ROOT)}  {path.stat().st_size // 1024} KB")
        made += 1
    if not made:
        print("nothing matched", file=sys.stderr)


if __name__ == "__main__":
    main()
