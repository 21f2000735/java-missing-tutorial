#!/usr/bin/env python3

from __future__ import annotations

from collections import OrderedDict
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
SOURCE_ROOT = ROOT / "src/main/java/com/learning/javamissing"

TOPIC_REQUIRED = [
    "Why This Exists",
    "The Pain Before It",
    "Java Creator Mindset",
    "How You Might Invent It",
    "Naive Attempt",
    "Why It Breaks",
    "Final Java Solution",
    "Code",
    "Walkthrough",
    "Mental Model",
    "Mistakes",
    "Tradeoffs",
    "Use / Avoid",
    "Summary",
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


def split_front_matter(text: str) -> tuple[str, str]:
    if text.startswith("---\n"):
        end = text.find("\n---\n", 4)
        if end != -1:
            return text[: end + 5], text[end + 5 :]
    return "", text


def parse_markdown(path: Path) -> tuple[str, str, str, OrderedDict[str, str]]:
    front_matter, body = split_front_matter(path.read_text())
    lines = body.splitlines()

    title = ""
    intro_lines = []
    sections: OrderedDict[str, list[str]] = OrderedDict()
    current_heading = None
    seen_title = False

    for line in lines:
        if line.startswith("# ") and not seen_title:
            title = line[2:].strip()
            seen_title = True
            continue

        if line.startswith("## "):
            current_heading = line[3:].strip()
            sections[current_heading] = []
            continue

        if current_heading is None:
            intro_lines.append(line)
        else:
            sections[current_heading].append(line)

    intro = "\n".join(intro_lines).strip()
    return (
        front_matter,
        title,
        intro,
        OrderedDict(
            (heading, "\n".join(content).strip())
            for heading, content in sections.items()
        ),
    )


def first_non_empty(*values: str) -> str:
    for value in values:
        if value and value.strip():
            return value.strip()
    return ""


def split_blocks(text: str) -> list[str]:
    return [part.strip() for part in re.split(r"\n\s*\n", text.strip()) if part.strip()]


def first_paragraph(text: str) -> str:
    parts = split_blocks(text)
    return parts[0] if parts else ""


def join_blocks(*blocks: str) -> str:
    items = [block.strip() for block in blocks if block and block.strip()]
    return "\n\n".join(items)


def block(title: str, content: str) -> str:
    if not content or not content.strip():
        return ""
    return f"### {title}\n\n{content.strip()}"


def lower_title(title: str) -> str:
    return title.lower() if title else "this topic"


def topic_defaults(title: str) -> dict[str, str]:
    lower = lower_title(title)
    return {
        "Why This Exists": (
            f"This topic exists because {lower} solves a problem that usually appears before learners even know the formal Java term."
        ),
        "The Pain Before It": (
            f"Before {lower}, developers usually try direct code first and only later discover where it becomes hard to reason about, unsafe, or repetitive."
        ),
        "Java Creator Mindset": (
            f"A Java designer would ask what should be made safer, clearer, or harder to misuse before adding {lower} to the language or library."
        ),
        "How You Might Invent It": (
            "Start from the painful version, keep only the rule that matters, and move step by step toward a cleaner abstraction."
        ),
        "Naive Attempt": (
            "The first instinct is usually to solve the problem directly with local code and hope the edge cases stay small."
        ),
        "Why It Breaks": (
            "That naive version usually breaks when the code grows, the edge cases multiply, or the intent stops being obvious."
        ),
        "Final Java Solution": (
            f"Java gives a structured solution here so {lower} becomes a repeatable pattern instead of a one-off fix."
        ),
        "Code": (
            "Run the Java example once with the default data, then explain what changed and why the new shape is easier to trust."
        ),
        "Walkthrough": (
            "Walk through the example in order: starting pain, the rule Java captures, and the final result."
        ),
        "Mental Model": (
            "Keep one compact mental model in mind: what comes in, what rule is enforced, and what outcome becomes simpler or safer."
        ),
        "Mistakes": (
            f"The common mistake is to memorize {lower} as syntax without understanding what problem it was invented to solve."
        ),
        "Tradeoffs": (
            "The gain is usually safety or clarity. The cost is usually more structure, more rules, or less flexibility in the wrong place."
        ),
        "Use / Avoid": (
            "Use it when the abstraction makes the decision clearer. Avoid it when the direct code is already simpler than the abstraction."
        ),
        "Summary": (
            f"After this topic, you should be able to explain why {lower} exists, what pain it removes, and how the final Java form emerged."
        ),
    }


def chapter_defaults(title: str) -> dict[str, str]:
    lower = lower_title(title.replace(" Learning Kit", ""))
    return {
        "Why This Chapter Exists": (
            f"This chapter exists because {lower} is easier to use mechanically than to explain from first principles."
        ),
        "The Pain Before It": (
            f"Before learners build a mental model for {lower}, the APIs feel like isolated facts instead of answers to one connected problem."
        ),
        "Java Creator Mindset": (
            f"A Java designer would ask what pressure is recurring across real programs and how {lower} can reduce that pressure without hiding too much."
        ),
        "How You Might Invent It": (
            "Treat the chapter as a reconstruction: start with the pain, try the direct version, then notice what rule Java keeps formalizing."
        ),
        "Naive Attempt": (
            "The naive approach is to solve each small problem separately and miss the common design rule connecting them."
        ),
        "Why It Breaks": (
            "That breaks when the same mistake repeats across files, teams, or interview questions and the code has no shared mental model."
        ),
        "Final Java Direction": (
            "The chapter should show the final Java direction as a set of connected choices, not as disconnected syntax facts."
        ),
        "Study Order": (
            "Follow the runnable examples in order. Each file should make the next one feel more necessary, not more random."
        ),
        "What To Notice": (
            "Notice which pressure the chapter is reducing: confusion, unsafe code, duplicated logic, hidden state, or poor API boundaries."
        ),
        "Mental Model": (
            "Keep one chapter-level rule in mind: what pressure creates the need for these tools, and what invariant each tool protects."
        ),
        "Common Mistakes": (
            "The most common mistake is to memorize surface differences without seeing the shared design pressure underneath them."
        ),
        "Tradeoffs": (
            "Each chapter tool buys something valuable, but only by accepting some extra structure, constraints, or ceremony."
        ),
        "Use / Avoid": (
            "Use the chapter ideas when they remove a real pressure. Avoid forcing them into code that is still simpler without them."
        ),
        "Practice": (
            "Run the examples again, change one assumption, and explain how that changes the design decision."
        ),
        "Summary": (
            f"After this chapter, you should be able to explain the design pressure behind {lower} and why Java answered it the way it did."
        ),
    }


def topic_required_sections(
    title: str, intro: str, sections: OrderedDict[str, str]
) -> OrderedDict[str, str]:
    defaults = topic_defaults(title)

    why_exists = first_non_empty(
        sections.get("Why This Exists", ""),
        sections.get("Why This Matters", ""),
        intro,
        first_paragraph(sections.get("The Problem", "")),
        defaults["Why This Exists"],
    )
    pain_before = first_non_empty(
        sections.get("The Pain Before It", ""),
        sections.get("Problem Statement", ""),
        sections.get("The Problem", ""),
        defaults["The Pain Before It"],
    )
    creator_mindset = first_non_empty(
        sections.get("Java Creator Mindset", ""),
        sections.get("Core Idea", ""),
        sections.get("Why This Works", ""),
        block("Company Lens", sections.get("Company Lens", "")),
        defaults["Java Creator Mindset"],
    )
    invent_it = first_non_empty(
        sections.get("How You Might Invent It", ""),
        sections.get("Intuition", ""),
        sections.get("Quick Visual", ""),
        sections.get("Mental Model", ""),
        defaults["How You Might Invent It"],
    )
    naive_attempt = first_non_empty(
        sections.get("Naive Attempt", ""),
        sections.get("❌ Bad Code", ""),
        sections.get("❌ Bad Mental Model", ""),
        sections.get("Wrong Example First", ""),
        defaults["Naive Attempt"],
    )
    why_breaks = first_non_empty(
        sections.get("Why It Breaks", ""),
        sections.get("Common Mistakes", ""),
        sections.get("Watch Out", ""),
        sections.get("Watch The Right Metric", ""),
        sections.get("❌ Bad Code", ""),
        sections.get("❌ Bad Mental Model", ""),
        defaults["Why It Breaks"],
    )
    final_solution = first_non_empty(
        sections.get("Final Java Solution", ""),
        sections.get("✅ Better Code", ""),
        sections.get("✅ Better Mental Model", ""),
        sections.get("Core Idea", ""),
        sections.get("Why This Works", ""),
        defaults["Final Java Solution"],
    )
    code = first_non_empty(
        sections.get("Code", ""),
        sections.get("Simple Example", ""),
        join_blocks(
            block("Run It", sections.get("Run This Code", "")),
            block("Expected Result", sections.get("Expected Output", "")),
        ),
        defaults["Code"],
    )
    walkthrough = first_non_empty(
        sections.get("Walkthrough", ""),
        sections.get("Step-by-Step Working", ""),
        sections.get("Why This Works", ""),
        block("Interview Angle", sections.get("Strong Interview Answer", "")),
        defaults["Walkthrough"],
    )
    mental_model = first_non_empty(
        sections.get("Mental Model", ""),
        sections.get("Intuition", ""),
        join_blocks(
            sections.get("Quick Visual", ""),
            sections.get("Comparison Snapshot", ""),
        ),
        defaults["Mental Model"],
    )
    mistakes = first_non_empty(
        sections.get("Mistakes", ""),
        sections.get("Common Mistakes", ""),
        sections.get("❌ Bad Code", ""),
        sections.get("❌ Bad Mental Model", ""),
        sections.get("Watch Out", ""),
        defaults["Mistakes"],
    )
    tradeoffs = first_non_empty(
        sections.get("Tradeoffs", ""),
        join_blocks(
            sections.get("Comparison Snapshot", ""),
            sections.get("Performance Lens", ""),
            sections.get("Benchmark Checklist", ""),
            sections.get("Benchmark Lens", ""),
        ),
        defaults["Tradeoffs"],
    )
    use_avoid = first_non_empty(
        sections.get("Use / Avoid", ""),
        sections.get("When To Use / When Not To Use", ""),
        join_blocks(
            block(
                "Use It When",
                first_non_empty(
                    sections.get("Use This When", ""),
                    sections.get("Real-World Decision Rule", ""),
                ),
            ),
            block("Avoid It When", sections.get("Avoid This When", "")),
        ),
        defaults["Use / Avoid"],
    )
    summary = first_non_empty(
        sections.get("Summary", ""),
        sections.get("After Reading This, You Should Know", ""),
        defaults["Summary"],
    )

    return OrderedDict(
        [
            ("Why This Exists", why_exists),
            ("The Pain Before It", pain_before),
            ("Java Creator Mindset", creator_mindset),
            ("How You Might Invent It", invent_it),
            ("Naive Attempt", naive_attempt),
            ("Why It Breaks", why_breaks),
            ("Final Java Solution", final_solution),
            ("Code", code),
            ("Walkthrough", walkthrough),
            ("Mental Model", mental_model),
            ("Mistakes", mistakes),
            ("Tradeoffs", tradeoffs),
            ("Use / Avoid", use_avoid),
            ("Summary", summary),
        ]
    )


def chapter_required_sections(
    title: str, intro: str, sections: OrderedDict[str, str]
) -> OrderedDict[str, str]:
    defaults = chapter_defaults(title)

    why_exists = first_non_empty(
        sections.get("Why This Chapter Exists", ""),
        sections.get("Why This Chapter Matters", ""),
        intro,
        sections.get("What Problem This Chapter Solves", ""),
        sections.get("The Problem", ""),
        defaults["Why This Chapter Exists"],
    )
    pain_before = first_non_empty(
        sections.get("The Pain Before It", ""),
        sections.get("The Problem", ""),
        sections.get("What Problem This Chapter Solves", ""),
        sections.get("Real Problems This Chapter Solves", ""),
        defaults["The Pain Before It"],
    )
    creator_mindset = first_non_empty(
        sections.get("Java Creator Mindset", ""),
        sections.get("Core Ideas", ""),
        sections.get("What This Chapter Covers", ""),
        sections.get("Senior Engineer Lens", ""),
        defaults["Java Creator Mindset"],
    )
    invent_it = first_non_empty(
        sections.get("How You Might Invent It", ""),
        sections.get("The Story", ""),
        sections.get("Concept Map", ""),
        sections.get("Visual Map", ""),
        sections.get("Learning Flow", ""),
        sections.get("Mental Model", ""),
        defaults["How You Might Invent It"],
    )
    naive_attempt = first_non_empty(
        sections.get("Naive Attempt", ""),
        sections.get("Compare With", ""),
        sections.get("Common Confusion", ""),
        sections.get("Avoid This Mistake", ""),
        defaults["Naive Attempt"],
    )
    why_breaks = first_non_empty(
        sections.get("Why It Breaks", ""),
        sections.get("Common Confusion", ""),
        sections.get("Avoid This Pattern When", ""),
        sections.get("Avoid This Approach When", ""),
        sections.get("Avoid Wrong Expectations", ""),
        sections.get("Avoid Jumping Ahead When", ""),
        sections.get("Avoid Overcomplicating It When", ""),
        sections.get("OCJP Traps", ""),
        defaults["Why It Breaks"],
    )
    final_direction = first_non_empty(
        sections.get("Final Java Direction", ""),
        sections.get("Core Ideas", ""),
        sections.get("What This Chapter Covers", ""),
        sections.get("Quick Summary", ""),
        sections.get("Deep Dive", ""),
        defaults["Final Java Direction"],
    )
    study_order = first_non_empty(
        sections.get("Study Order", ""),
        sections.get("Run This First", ""),
        defaults["Study Order"],
    )
    what_to_notice = first_non_empty(
        sections.get("What To Notice", ""),
        join_blocks(
            sections.get("What To Look For", ""),
            block("Interview Focus", sections.get("Interview Focus", "")),
            block("Decision Guide", sections.get("Decision Chart", "")),
            block("Compare With", sections.get("Compare With", "")),
        ),
        defaults["What To Notice"],
    )
    mental_model = first_non_empty(
        sections.get("Mental Model", ""),
        sections.get("Right Mental Model", ""),
        sections.get("Concept Map", ""),
        sections.get("Visual Map", ""),
        sections.get("Deep Dive", ""),
        defaults["Mental Model"],
    )
    common_mistakes = first_non_empty(
        sections.get("Common Mistakes", ""),
        sections.get("Wrong Mental Model", ""),
        sections.get("Common Confusion", ""),
        sections.get("Avoid This Mistake", ""),
        sections.get("OCJP Traps", ""),
        defaults["Common Mistakes"],
    )
    tradeoffs = first_non_empty(
        sections.get("Tradeoffs", ""),
        join_blocks(
            sections.get("Compare With", ""),
            sections.get("What The Compiler Checks", ""),
            sections.get("What Happens At Runtime", ""),
            sections.get("Senior Engineer Lens", ""),
        ),
        defaults["Tradeoffs"],
    )
    use_avoid = first_non_empty(
        sections.get("Use / Avoid", ""),
        sections.get("When To Use / When Not To Use", ""),
        join_blocks(
            block(
                "Use It When",
                first_non_empty(
                    sections.get("Use This Chapter When", ""),
                    sections.get("Use This Pattern When", ""),
                    sections.get("When To Use", ""),
                ),
            ),
            block("Avoid It When", sections.get("When Not To Use", "")),
        ),
        defaults["Use / Avoid"],
    )
    practice = first_non_empty(
        sections.get("Practice", ""),
        join_blocks(
            sections.get("Quick Quiz", ""),
            block("Mini Case Study", sections.get("Mini Case Study", "")),
            block("Case Study", sections.get("Small Case Study", "")),
        ),
        defaults["Practice"],
    )
    summary = first_non_empty(
        sections.get("Summary", ""),
        sections.get("After Reading This Chapter, You Should Know", ""),
        sections.get("Quick Summary", ""),
        defaults["Summary"],
    )

    return OrderedDict(
        [
            ("Why This Chapter Exists", why_exists),
            ("The Pain Before It", pain_before),
            ("Java Creator Mindset", creator_mindset),
            ("How You Might Invent It", invent_it),
            ("Naive Attempt", naive_attempt),
            ("Why It Breaks", why_breaks),
            ("Final Java Direction", final_direction),
            ("Study Order", study_order),
            ("What To Notice", what_to_notice),
            ("Mental Model", mental_model),
            ("Common Mistakes", common_mistakes),
            ("Tradeoffs", tradeoffs),
            ("Use / Avoid", use_avoid),
            ("Practice", practice),
            ("Summary", summary),
        ]
    )


def write_markdown(
    path: Path,
    front_matter: str,
    title: str,
    required_sections: OrderedDict[str, str],
    original_sections: OrderedDict[str, str],
    required_names: list[str],
) -> None:
    parts = []
    if front_matter:
        parts.append(front_matter.strip())
        parts.append("")
    parts.append(f"# {title}")

    for heading, content in required_sections.items():
        parts.append("")
        parts.append(f"## {heading}")
        parts.append("")
        parts.append(content.strip())

    for heading, content in original_sections.items():
        if heading in required_names:
            continue
        if not content.strip():
            continue
        parts.append("")
        parts.append(f"## {heading}")
        parts.append("")
        parts.append(content.strip())

    path.write_text("\n".join(parts).rstrip() + "\n")


def normalize_topic(path: Path) -> None:
    front_matter, title, intro, sections = parse_markdown(path)
    write_markdown(
        path,
        front_matter,
        title,
        topic_required_sections(title, intro, sections),
        sections,
        TOPIC_REQUIRED,
    )


def normalize_chapter(path: Path) -> None:
    front_matter, title, intro, sections = parse_markdown(path)
    write_markdown(
        path,
        front_matter,
        title,
        chapter_required_sections(title, intro, sections),
        sections,
        CHAPTER_REQUIRED,
    )


def main() -> int:
    for path in sorted(SOURCE_ROOT.rglob("TopicGuide.md")):
        normalize_topic(path)

    for path in sorted(SOURCE_ROOT.rglob("ChapterGuide.md")):
        normalize_chapter(path)

    print("Guide normalization complete.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
