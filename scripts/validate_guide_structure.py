#!/usr/bin/env python3

from __future__ import annotations

from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
SOURCE_ROOT = ROOT / "src/main/java/com/learning/javamissing"

TOPIC_REQUIRED = [
    "Concept",
    "Example",
    "What happens",
    "What stays stable",
    "What changes",
    "Why it matters",
    "Rule",
    "Try this",
]

CHAPTER_REQUIRED = [
    "Why This Chapter Exists",
    "The Pain Before It",
    "Java Creator Mindset",
    "How You Might Invent It",
    "Naive Attempt",
    "Why It Breaks",
    "Final Java Direction",
    "Study Order",
    "What To Notice",
    "Mental Model",
    "Common Mistakes",
    "Tradeoffs",
    "Use / Avoid",
    "Practice",
    "Summary",
]

CHAPTER_APPENDIX = {
    "After Reading This Chapter, You Should Know",
    "Avoid Jumping Ahead When",
    "Avoid Overcomplicating It When",
    "Avoid This Approach When",
    "Avoid This Mistake",
    "Avoid This Pattern When",
    "Avoid Wrong Expectations",
    "Beginner Focus",
    "Common Confusion",
    "Company Lens",
    "Common Mistakes",
    "Final Java Direction",
    "How You Might Invent It",
    "Core Ideas",
    "Intuition",
    "Java Creator Mindset",
    "Mistakes",
    "Naive Attempt",
    "Quick Quiz",
    "Interview Questions",
    "Interview Focus",
    "Mental Model",
    "Practice",
    "Problem Statement",
    "Summary",
    "Study Order",
    "The Pain Before It",
    "What To Look For",
    "What To Notice",
    "Tradeoffs",
    "Use / Avoid",
    "Effective Java Mapping",
    "Effective Java Coverage",
    "OCJP Focus",
    "OCJP Traps",
    "Compare With",
    "Quick Compare Table",
    "Mini Case Study",
    "Small Case Study",
    "Concept Map",
    "Quick Summary",
    "Visual Map",
    "Learning Flow",
    "Core Notes",
    "Deep Dive",
    "Deep-Dive Promise",
    "Real Problems This Chapter Solves",
    "What This Chapter Covers",
    "What You Learn",
    "The Problem",
    "The Story",
    "Why This Chapter Exists",
    "Why It Breaks",
    "Why This Chapter Matters",
    "Use This Chapter When",
    "Use This Pattern When",
    "When To Use / When Not To Use",
    "When To Use",
    "When Not To Use",
    "Right Mental Model",
    "Wrong Mental Model",
    "What The Compiler Checks",
    "What Happens At Runtime",
    "Senior Engineer Lens",
    "Decision Chart",
    "Version Note",
    "What Problem This Chapter Solves",
    "Sources",
    "Next Chapter",
    "Next Step",
    "Slide-Ready Outline",
    "Run This First",
}


def strip_front_matter(text: str) -> str:
    if text.startswith("---\n"):
        parts = text.split("\n---\n", 1)
        if len(parts) == 2:
            return parts[1]
    return text


def h2_headings(text: str) -> list[str]:
    return re.findall(r"^## (.+)$", text, flags=re.MULTILINE)


def bold_labels(text: str) -> list[str]:
    return [
        match.strip()
        for match in re.findall(r"^\*\*([^*]+)\*\*$", text, flags=re.MULTILINE)
    ]


def validate_topic(path: Path, headings: list[str]) -> list[str]:
    if not headings:
        return ["empty guide"]

    errors = []
    if len(headings) != 1:
        errors.append(
            f"expected exactly 1 H2 heading, found {len(headings)}"
        )

    labels = bold_labels(strip_front_matter(path.read_text()))
    if len(labels) < len(TOPIC_REQUIRED):
        errors.append(
            f"expected at least {len(TOPIC_REQUIRED)} bold section labels, found {len(labels)}"
        )
        return errors

    actual = labels[: len(TOPIC_REQUIRED)]
    if actual != TOPIC_REQUIRED:
        errors.append(
            "required bold label order mismatch:\n"
            f"  expected: {TOPIC_REQUIRED}\n"
            f"  found:    {actual}"
        )

    return errors


def validate(path: Path, required: list[str], appendix: set[str]) -> list[str]:
    headings = h2_headings(strip_front_matter(path.read_text()))
    errors = []

    if len(headings) < len(required):
        errors.append(
            f"expected at least {len(required)} H2 headings, found {len(headings)}"
        )
        return errors

    actual_required = headings[: len(required)]
    if actual_required != required:
        errors.append(
            "required H2 order mismatch:\n"
            f"  expected: {required}\n"
            f"  found:    {actual_required}"
        )

    extra = headings[len(required) :]
    disallowed = [heading for heading in extra if heading not in appendix]
    if disallowed:
        errors.append(
            "unexpected appendix H2 headings: " + ", ".join(disallowed)
        )

    return errors


def main() -> int:
    failures = []

    for path in sorted(SOURCE_ROOT.rglob("TopicGuide.md")):
        rel = path.relative_to(ROOT)
        headings = h2_headings(strip_front_matter(path.read_text()))
        for error in validate_topic(path, headings):
            failures.append(f"{rel}: {error}")

    for path in sorted(SOURCE_ROOT.rglob("ChapterGuide.md")):
        rel = path.relative_to(ROOT)
        for error in validate(path, CHAPTER_REQUIRED, CHAPTER_APPENDIX):
            failures.append(f"{rel}: {error}")

    if failures:
        print("Guide structure validation failed.")
        for failure in failures:
            print(f"- {failure}")
        return 1

    print("Guide structure validation passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
