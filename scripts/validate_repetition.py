#!/usr/bin/env python3

from __future__ import annotations

from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
SOURCE_ROOT = ROOT / "src/main/java/com/learning/javamissing"

# Enforce repetition checks first on the guides we have already cleaned up.
ENFORCED_GUIDES = {
    "sec02_collections/ch01_collections/topics/list_set_map/TopicGuide.md",
    "sec04_streams_and_functional_style/ch01_streams/ChapterGuide.md",
    "sec06_design_patterns/ch01_strategy_pattern/ChapterGuide.md",
    "sec06_design_patterns/ch01_strategy_pattern/topics/choosing_behavior_with_strategy/TopicGuide.md",
    "sec06_design_patterns/ch02_creational_patterns/ChapterGuide.md",
    "sec08_internal_of_jvm/ch01_memory_and_execution_basics/ChapterGuide.md",
    "sec08_internal_of_jvm/ch01_memory_and_execution_basics/topics/understanding_stack_heap_and_references/TopicGuide.md",
    "sec08_internal_of_jvm/ch02_jvm_jdk_jre_and_class_loading/ChapterGuide.md",
    "sec08_internal_of_jvm/ch02_jvm_jdk_jre_and_class_loading/topics/runtime_layers/TopicGuide.md",
    "sec08_internal_of_jvm/ch02_jvm_jdk_jre_and_class_loading/topics/class_loading_lifecycle/TopicGuide.md",
    "sec08_internal_of_jvm/ch03_jit_and_garbage_collection/ChapterGuide.md",
    "sec08_internal_of_jvm/ch03_jit_and_garbage_collection/topics/gc_strategies/TopicGuide.md",
    "sec21_company_interview_tracks/ch01_google_meta_amazon/topics/idempotent_reservations/TopicGuide.md",
}

FRONT_MATTER_RE = re.compile(r"^---\n[\s\S]*?\n---\n?", re.MULTILINE)
HEADING_RE = re.compile(r"^## (.+)$", re.MULTILINE)


def strip_front_matter(raw: str) -> str:
    return FRONT_MATTER_RE.sub("", raw, count=1)


def normalize_markdown(raw: str) -> str:
    text = re.sub(r"```[\s\S]*?```", " ", raw)
    text = re.sub(r"`([^`]+)`", r"\1", text)
    text = re.sub(r"!\[[^\]]*\]\([^)]*\)", " ", text)
    text = re.sub(r"\[([^\]]+)\]\([^)]*\)", r"\1", text)
    text = re.sub(r"^#{1,6}\s+", "", text, flags=re.MULTILINE)
    text = re.sub(r"^\s*[-*+]\s+", "", text, flags=re.MULTILINE)
    text = re.sub(r"^\s*\d+\.\s+", "", text, flags=re.MULTILINE)
    text = text.replace("|", " ")
    text = re.sub(r"\s+", " ", text)
    return text.strip().lower()


def section_bodies(raw: str) -> list[tuple[str, str]]:
    content = strip_front_matter(raw)
    matches = list(HEADING_RE.finditer(content))
    sections: list[tuple[str, str]] = []

    for index, match in enumerate(matches):
        title = match.group(1).strip()
        start = match.end()
        end = matches[index + 1].start() if index + 1 < len(matches) else len(content)
        body = content[start:end].strip()
        sections.append((title, body))
    return sections


def repeated_sections(path: Path) -> list[str]:
    duplicates: list[str] = []
    seen: dict[str, str] = {}

    for title, body in section_bodies(path.read_text()):
        normalized = normalize_markdown(body)
        if len(normalized) < 80:
            continue
        previous = seen.get(normalized)
        if previous:
            duplicates.append(f"{previous} == {title}")
        else:
            seen[normalized] = title

    return duplicates


def main() -> int:
    failures: list[str] = []

    for relative in sorted(ENFORCED_GUIDES):
        path = SOURCE_ROOT / relative
        if not path.exists():
            failures.append(f"{path.relative_to(ROOT)}: missing enforced guide")
            continue

        duplicates = repeated_sections(path)
        if duplicates:
            failures.append(
                f"{path.relative_to(ROOT)}: repeated section content detected ({', '.join(duplicates)})"
            )

    if failures:
        print("Guide repetition validation failed.")
        for failure in failures:
            print(f"- {failure}")
        return 1

    print("Guide repetition validation passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
