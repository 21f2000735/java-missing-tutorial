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
    "Problem",
    "Naive Approach",
    "Failure",
    "Fix",
    "Improvement",
    "What stays stable",
    "What changes",
    "Rule",
    "Try this",
]


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
        for error in validate(path, CHAPTER_REQUIRED, set()):
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
