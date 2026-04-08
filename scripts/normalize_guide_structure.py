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
    "Practice",
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

SECTION_REQUIRED = [
    "Why This Section Exists",
    "Real Problems",
    "Start Here If",
    "How To Read This Section",
    "Current Chapters",
    "Reading Order",
    "Common Mistakes",
    "Practice",
    "Next Step",
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
    intro_lines: list[str] = []
    sections: OrderedDict[str, list[str]] = OrderedDict()
    current_heading: str | None = None
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


def join_blocks(*blocks: str) -> str:
    items = [block.strip() for block in blocks if block and block.strip()]
    return "\n\n".join(items)


def bullet_list(items: list[str]) -> str:
    return "\n".join(f"- {item}" for item in items if item)


def numbered_list(items: list[str]) -> str:
    return "\n".join(f"{index}. {item}" for index, item in enumerate(items, 1))


def humanize_slug(value: str) -> str:
    value = re.sub(r"^(sec|ch)\d+_", "", value)
    value = value.replace("_", " ").strip()
    if not value:
        return ""
    return re.sub(r"\b(\w)", lambda match: match.group(1).upper(), value)


def camel_to_title(value: str) -> str:
    value = re.sub(r"([a-z0-9])([A-Z])", r"\1 \2", value)
    value = value.replace("_", " ").strip()
    return re.sub(r"\b(\w)", lambda match: match.group(1).upper(), value)


def topic_title(topic_dir: Path) -> str:
    guide = topic_dir / "TopicGuide.md"
    if guide.exists():
        _, title, _, _ = parse_markdown(guide)
        if title:
            return title.strip()
    java_file = first_java_file(topic_dir)
    if java_file:
        return camel_to_title(java_file.stem)
    return humanize_slug(topic_dir.name)


def chapter_title(chapter_dir: Path) -> str:
    guide = chapter_dir / "ChapterGuide.md"
    if guide.exists():
        _, title, _, _ = parse_markdown(guide)
        if title:
            return title.strip()
    return f"{humanize_slug(chapter_dir.name)} Learning Kit"


def first_java_file(topic_dir: Path) -> Path | None:
    java_files = sorted(topic_dir.glob("*.java"))
    return java_files[0] if java_files else None


def parse_java_topic_comment(java_path: Path) -> dict[str, str]:
    text = java_path.read_text()
    match = re.search(r"/\*\*([\s\S]*?)\*/", text)
    if not match:
        return {}

    fields = {
        "concept": "",
        "why this concept is needed": "",
        "what problem this solves": "",
        "real-world setup": "",
        "how to think about it": "",
        "how to code it": "",
        "expected output": "",
    }

    labels = {
        "concept": "concept",
        "why this concept is needed": "why this concept is needed",
        "what problem this solves": "what problem this solves",
        "real-world setup": "real-world setup",
        "how to think about it": "how to think about it",
        "how to code it": "how to code it",
        "expected output": "expected output",
    }

    current_key = ""
    for raw_line in match.group(1).splitlines():
        line = raw_line.strip()
        if line.startswith("*"):
            line = line[1:].lstrip()
        if not line:
            continue

        lowered = line.lower()
        matched_label = next((label for label in labels if lowered.startswith(f"{label}:")), "")
        if matched_label:
            current_key = labels[matched_label]
            fields[current_key] = line[len(matched_label) + 1 :].strip()
            continue

        if current_key:
            if current_key == "expected output":
                fields[current_key] = (
                    f"{fields[current_key]}\n{line}".strip() if fields[current_key] else line
                )
            else:
                fields[current_key] = f"{fields[current_key]} {line}".strip()

    return fields


def parse_front_matter_value(front_matter: str, key: str) -> str:
    for raw_line in front_matter.splitlines():
        line = raw_line.strip()
        if not line or line.startswith("---") or ":" not in line:
            continue
        current_key, value = line.split(":", 1)
        if current_key.strip().lower() == key.lower():
            return value.strip()
    return ""


def extract_main_snippet(java_path: Path) -> str:
    lines = java_path.read_text().splitlines()
    start = None
    for index, line in enumerate(lines):
        if re.search(r"\bpublic\s+static\s+void\s+main\s*\(", line):
            start = index
            break
    if start is None:
        return ""

    snippet: list[str] = []
    brace_depth = 0
    in_block = False

    for line in lines[start:]:
        if "{" in line:
            brace_depth += line.count("{")
            in_block = True
        if in_block:
            snippet.append(line.rstrip())
        if "}" in line and in_block:
            brace_depth -= line.count("}")
            if brace_depth <= 0:
                break

    if not snippet:
        return ""

    return "\n".join(snippet).rstrip()


def extract_printed_lines(java_path: Path) -> list[str]:
    snippet = java_path.read_text()
    lines: list[str] = []
    for raw_line in snippet.splitlines():
        match = re.search(r'System\.out\.println\("([^"]*)"\);', raw_line)
        if match:
            lines.append(match.group(1))
    return lines


def split_step_lines(text: str) -> list[str]:
    compact = " ".join(line.strip() for line in text.splitlines() if line.strip())
    if not compact:
        return []

    matches = re.findall(r"\d+\.\s*(.*?)(?=(?:\d+\.\s)|$)", compact)
    if len(matches) > 1:
        return [match.strip() for match in matches if match.strip()]

    return [part.strip() for part in re.split(r"[.;]\s+", compact) if part.strip()]


def split_output_lines(text: str) -> list[str]:
    lines = []
    for line in text.splitlines():
        stripped = line.strip()
        if stripped:
            lines.append(stripped)
    return lines


def compact_text(text: str) -> str:
    return re.sub(r"\s+", " ", text).strip()


def first_sentence(text: str) -> str:
    compact = compact_text(text)
    if not compact:
        return ""

    match = re.search(r"(?<=[.!?])\s", compact)
    if match:
        return compact[: match.start() + 1].strip()
    return compact


def shorten_text(text: str, max_sentences: int = 2) -> str:
    compact = compact_text(text)
    if not compact:
        return ""

    sentences = re.split(r"(?<=[.!?])\s+", compact)
    chosen = [sentence.strip() for sentence in sentences if sentence.strip()][:max_sentences]
    if chosen:
        return " ".join(chosen)
    return compact


def bullet_excerpt(text: str, limit: int = 3) -> str:
    bullets = []
    for raw_line in text.splitlines():
        stripped = raw_line.strip()
        if not stripped or stripped.startswith("```"):
            continue
        stripped = re.sub(r"^[-*]\s+", "", stripped)
        match = re.match(r"^\d+\.\s+(.*)$", stripped)
        if match:
            bullets.append(match.group(1).strip())
            continue
        if stripped.startswith(("What happens:", "What to observe:", "Why it matters:")):
            continue
        if stripped.endswith(":") and len(stripped.split()) <= 4:
            continue
        if stripped:
            bullets.append(stripped)
    if not bullets:
        sentences = [sentence.strip() for sentence in re.split(r"(?<=[.!?])\s+", compact_text(text)) if sentence.strip()]
        bullets = sentences
    if not bullets:
        return ""
    return bullet_list(bullets[:limit])


def fenced_java(code: str) -> str:
    if not code.strip():
        return ""
    return f"```java\n{code.rstrip()}\n```"


def topic_sections_from_java(
    java_path: Path | None,
    guide_title: str,
    intro: str,
    sections: OrderedDict[str, str],
    visual_mode: str = "",
    visual_asset: str = "",
) -> OrderedDict[str, str]:
    meta = parse_java_topic_comment(java_path) if java_path else {}
    fallback_name = java_path.stem if java_path else guide_title
    concept = meta.get("concept") or guide_title or fallback_name
    concept_title = guide_title or camel_to_title(fallback_name or guide_title)
    why_needed = meta.get("why this concept is needed", "")
    problem = meta.get("what problem this solves", "")
    setup = meta.get("real-world setup", "")
    think = meta.get("how to think about it", "")
    code_steps = meta.get("how to code it", "")
    expected = meta.get("expected output", "")
    main_snippet = extract_main_snippet(java_path) if java_path else ""
    printed_lines = extract_printed_lines(java_path) if java_path else []
    printed_text = "\n".join(printed_lines)
    file_link = f"[{java_path.name}]({java_path.name})" if java_path else ""
    topic_dir = java_path.parent if java_path else None
    visual_name = visual_asset or (
        next((path.name for path in topic_dir.glob("*.svg")), "") if topic_dir else ""
    )
    visual_block = ""
    if visual_mode.lower() in {"required", "recommended"} and visual_name:
        visual_block = f"![{concept} visual](./{visual_name})"

    concept_source = first_non_empty(
        sections.get("Concept", ""),
        sections.get("Why This Exists", ""),
        sections.get("Why This Matters", ""),
        intro,
        why_needed,
        problem,
        setup,
        printed_text,
    )
    example_source = first_non_empty(
        sections.get("Code", ""),
        sections.get("Small Code Snippet", ""),
        sections.get("Simple Example", ""),
        sections.get("Run This Code", ""),
    )
    if not example_source and main_snippet:
        example_source = fenced_java(main_snippet)
    if not example_source and file_link:
        example_source = f"Run {file_link} and change one assumption at a time."
    if visual_block:
        example_source = join_blocks(example_source, visual_block)

    happens_source = first_non_empty(
        printed_text,
        sections.get("What happens", ""),
        sections.get("Walkthrough", ""),
        sections.get("Expected Output", ""),
        expected,
        code_steps,
    )
    stable_source = first_non_empty(
        printed_text,
        sections.get("What stays stable", ""),
        sections.get("Mental Model", ""),
        sections.get("Java Creator Mindset", ""),
        sections.get("Core Idea", ""),
        think,
    )
    changes_source = first_non_empty(
        printed_text,
        sections.get("What changes", ""),
        sections.get("The Pain Before It", ""),
        sections.get("Why It Breaks", ""),
        sections.get("Common Mistakes", ""),
        problem,
        setup,
    )
    matters_source = first_non_empty(
        printed_text,
        sections.get("Why it matters", ""),
        sections.get("Tradeoffs", ""),
        sections.get("Use / Avoid", ""),
        sections.get("Why This Matters", ""),
        why_needed,
        problem,
    )
    rule_source = first_non_empty(
        printed_text,
        sections.get("Rule", ""),
        sections.get("Final Java Solution", ""),
        sections.get("Java Creator Mindset", ""),
        sections.get("How You Might Invent It", ""),
        think,
    )
    try_this_source = first_non_empty(
        sections.get("Try this", ""),
        sections.get("Practice", ""),
        sections.get("How You Might Invent It", ""),
        code_steps,
        printed_text,
    )

    concept_text = shorten_text(concept_source, 2)
    if not concept_text:
        concept_text = (
            f"This topic explains {concept.lower()} by showing the rule that keeps the example correct."
        )
    if concept_text.lower().startswith("concept:") and printed_lines:
        concept_text = printed_lines[0]

    what_happens = bullet_excerpt(happens_source, 3) or bullet_list(
        [
            "Run the example and compare the output with the rule in the explanation.",
            "Change one input or one line.",
            "Observe what stayed the same and what changed.",
        ]
    )

    stable_text = shorten_text(stable_source, 2)
    if stable_text:
        stable_text = bullet_excerpt(stable_source, 2)
    if not stable_text:
        stable_text = bullet_list(
            [
                f"The core rule behind {concept.lower()} stays the same.",
                "The example keeps the same Java shape while you vary one thing.",
            ]
        )
    what_stays_stable = stable_text

    changes_text = bullet_excerpt(changes_source, 2)
    if not changes_text:
        changes_text = bullet_list(
            [
                "The input, state, or execution path is what changes.",
                "That change is what reveals the behavior you need to understand.",
            ]
        )
    what_changes = changes_text

    why_it_matters = shorten_text(matters_source, 2)
    if not why_it_matters:
        why_it_matters = "This matters because the rule keeps the behavior predictable when the code gets real."

    rule_text = first_sentence(rule_source)
    if not rule_text:
        rule_text = f"Use {concept.lower()} when it makes the design easier to trust."

    try_this = bullet_excerpt(try_this_source, 3) or bullet_list(
        [
            "Change one line and rerun the file.",
            "Make one assumption smaller or larger.",
            "Write down what stayed stable and what changed.",
        ]
    )

    return OrderedDict(
        [
            ("Concept", concept_text),
            ("Example", example_source),
            ("What happens", what_happens),
            ("What stays stable", what_stays_stable),
            ("What changes", what_changes),
            ("Why it matters", why_it_matters),
            ("Rule", f"👉 Rule: {rule_text}"),
            ("Try this", try_this),
        ]
    )


def write_markdown(
    path: Path,
    front_matter: str,
    title: str,
    required_sections: OrderedDict[str, str],
    appendix_sections: OrderedDict[str, str] | None = None,
) -> None:
    appendix_sections = appendix_sections or OrderedDict()
    parts: list[str] = []

    if front_matter:
        parts.append(front_matter.strip())
        parts.append("")

    parts.append(f"# {title}")

    for heading, content in required_sections.items():
        parts.append("")
        parts.append(f"## {heading}")
        parts.append("")
        parts.append(content.strip())

    for heading, content in appendix_sections.items():
        if not content.strip():
            continue
        parts.append("")
        parts.append(f"## {heading}")
        parts.append("")
        parts.append(content.strip())

    path.write_text("\n".join(parts).rstrip() + "\n")


def topic_defaults(title: str, java_file: Path | None) -> dict[str, str]:
    subject = title.lower() if title else "this topic"
    example_link = f"[{java_file.name}]({java_file.name})" if java_file else "the Java file"
    return {
        "Why This Exists": (
            f"This topic explains {subject} because it solves a concrete problem that becomes visible once the naive version starts to fail."
        ),
        "The Pain Before It": (
            f"Before {subject}, the code often works for a tiny case but becomes hard to trust once edge cases, state, or reuse enter the picture."
        ),
        "Java Creator Mindset": (
            f"A Java designer would ask what rule needs to be made visible so the safer choice is also the clearer one."
        ),
        "How You Might Invent It": (
            "Start from the broken version, keep only the rule that matters, and move toward the smallest abstraction that makes the mistake harder to repeat."
        ),
        "Naive Attempt": (
            "The first attempt usually uses direct code and leaves too much behavior implicit."
        ),
        "Why It Breaks": (
            "That version breaks when the same assumption no longer holds in real code, especially around edge cases, state, or repeated use."
        ),
        "Final Java Solution": (
            f"Java's final form for {subject} makes the important rule visible and repeatable instead of hiding it inside ad hoc code."
        ),
        "Code": (
            f"Run {example_link} and focus on the runnable example first. Then compare the output with the explanation below."
        ),
        "Walkthrough": (
            numbered_list(
                [
                    "Identify the starting state or input.",
                    "Run the example once without changing anything.",
                    "Change one line or one input.",
                    "Compare the new result with the rule the topic is teaching.",
                ]
            )
        ),
        "Mental Model": (
            bullet_list(
                [
                    "What rule is being enforced?",
                    "What stays safer or clearer because of that rule?",
                    "What would break if the rule were removed?",
                ]
            )
        ),
        "Mistakes": (
            bullet_list(
                [
                    "memorizing syntax before the problem",
                    "assuming the tiny example covers every case",
                    "changing the rule without rerunning the example",
                ]
            )
        ),
        "Tradeoffs": (
            join_blocks(
                "Gain: clearer behavior or safer code.",
                "Cost: a bit more structure or one more rule to remember.",
                "Question: is the extra rule cheaper than the bug it prevents?",
            )
        ),
        "Use / Avoid": (
            join_blocks(
                "Use it when the rule removes a real bug or removes guesswork.",
                "Avoid it when direct code is already clearer and just as safe.",
            )
        ),
        "Practice": (
            f"Change one input in {example_link}, rerun it, and write down what changed."
        ),
        "Summary": (
            f"After this topic, you should be able to explain the problem it solves, the rule Java enforces, and the smallest change that proves you understand it."
        ),
    }


def chapter_defaults(title: str) -> dict[str, str]:
    subject = title.replace(" Learning Kit", "").strip().lower() if title else "this chapter"
    return {
        "Why This Chapter Exists": (
            f"This chapter ties the topic files together so you can see one recurring problem and the Java choices that make it easier to reason about."
        ),
        "The Pain Before It": (
            f"Before learners build a mental model for {subject}, the examples feel isolated and the rules sound like trivia."
        ),
        "Java Creator Mindset": (
            f"A Java designer would ask what pressure repeats across real programs and which API shape makes the safe path obvious."
        ),
        "How You Might Invent It": (
            "Start from a failing program or awkward design, then strip it down until the rule that matters becomes visible."
        ),
        "Naive Attempt": (
            "The first attempt usually solves each subproblem separately and hides the common decision underneath."
        ),
        "Why It Breaks": (
            "That breaks when the same issue repeats across files, threads, or use cases and the code has no shared rule to lean on."
        ),
        "Final Java Direction": (
            "The final direction shows the design as connected choices, not as disconnected syntax facts."
        ),
        "Study Order": (
            "Run the topic files in order and compare the runnable example with the explanation in each guide."
        ),
        "What To Notice": (
            bullet_list(
                [
                    "which pressure each topic reduces",
                    "where the runnable example changes behavior",
                    "what becomes simpler once the rule is used correctly",
                ]
            )
        ),
        "Mental Model": (
            "Keep one chapter-level rule in mind: what pressure creates the need for these tools, and what invariant does each tool protect?"
        ),
        "Common Mistakes": (
            bullet_list(
                [
                    "memorizing surface differences without seeing the shared pressure",
                    "skipping the runnable examples and only reading the prose",
                    "using the heavier approach when the simpler code is still enough",
                ]
            )
        ),
        "Tradeoffs": (
            join_blocks(
                "Each chapter tool buys something valuable.",
                "The cost is usually extra structure, constraints, or ceremony.",
            )
        ),
        "Use / Avoid": (
            join_blocks(
                "Use the chapter ideas when they remove a real pressure.",
                "Avoid forcing them into code that is still simpler without them.",
            )
        ),
        "Practice": (
            "Run the examples again, change one assumption, and explain how that changes the design decision."
        ),
        "Summary": (
            f"After this chapter, you should be able to explain the design pressure behind {subject} and why Java answered it the way it did."
        ),
    }


def section_defaults(title: str) -> dict[str, str]:
    subject = title.lower() if title else "this section"
    return {
        "Why This Section Exists": (
            f"This section groups related chapters around {subject} so you can learn one design pressure at a time instead of collecting isolated facts."
        ),
        "Real Problems": (
            bullet_list(
                [
                    "the code is correct for one case but unclear for the next one",
                    "the API names feel related but not obviously different",
                    "the same bug keeps showing up in slightly different forms",
                ]
            )
        ),
        "Start Here If": (
            bullet_list(
                [
                    f"{subject} still feels fuzzy",
                    "the examples look related but the boundary between them is still blurry",
                    "you want the practical problem before the syntax",
                ]
            )
        ),
        "How To Read This Section": (
            numbered_list(
                [
                    "Read the problem statement first.",
                    "Run the code in the first chapter.",
                    "Change one assumption and compare the output.",
                    "Move to the next chapter only after the rule is clear.",
                ]
            )
        ),
        "Current Chapters": "",
        "Reading Order": "",
        "Common Mistakes": (
            bullet_list(
                [
                    "starting with the API name instead of the problem",
                    "treating the examples as trivia instead of a design choice",
                    "skipping the runnable code and only skimming the prose",
                ]
            )
        ),
        "Practice": (
            "Run the first chapter in this section, change one assumption in its example, and explain the result in one paragraph."
        ),
        "Next Step": (
            "Move to the next section only after you can explain the current section in plain English."
        ),
    }


def topic_required_sections(
    title: str, intro: str, sections: OrderedDict[str, str], topic_dir: Path
) -> OrderedDict[str, str]:
    defaults = topic_defaults(title, first_java_file(topic_dir))

    return OrderedDict(
        [
            (
                "Why This Exists",
                first_non_empty(
                    sections.get("Why This Exists", ""),
                    sections.get("Why This Matters", ""),
                    intro,
                    first_non_empty(sections.get("The Problem", "")),
                    defaults["Why This Exists"],
                ),
            ),
            (
                "The Pain Before It",
                first_non_empty(
                    sections.get("The Pain Before It", ""),
                    sections.get("Problem Statement", ""),
                    sections.get("The Problem", ""),
                    defaults["The Pain Before It"],
                ),
            ),
            (
                "Java Creator Mindset",
                first_non_empty(
                    sections.get("Java Creator Mindset", ""),
                    sections.get("Core Idea", ""),
                    sections.get("Why This Works", ""),
                    sections.get("Company Lens", ""),
                    defaults["Java Creator Mindset"],
                ),
            ),
            (
                "How You Might Invent It",
                first_non_empty(
                    sections.get("How You Might Invent It", ""),
                    sections.get("Intuition", ""),
                    sections.get("Quick Visual", ""),
                    sections.get("Mental Model", ""),
                    defaults["How You Might Invent It"],
                ),
            ),
            (
                "Naive Attempt",
                first_non_empty(
                    sections.get("Naive Attempt", ""),
                    sections.get("❌ Bad Code", ""),
                    sections.get("❌ Bad Mental Model", ""),
                    sections.get("Wrong Example First", ""),
                    defaults["Naive Attempt"],
                ),
            ),
            (
                "Why It Breaks",
                first_non_empty(
                    sections.get("Why It Breaks", ""),
                    sections.get("Common Mistakes", ""),
                    sections.get("Watch Out", ""),
                    sections.get("Watch The Right Metric", ""),
                    defaults["Why It Breaks"],
                ),
            ),
            (
                "Final Java Solution",
                first_non_empty(
                    sections.get("Final Java Solution", ""),
                    sections.get("✅ Better Code", ""),
                    sections.get("✅ Better Mental Model", ""),
                    sections.get("Core Idea", ""),
                    sections.get("Why This Works", ""),
                    defaults["Final Java Solution"],
                ),
            ),
            (
                "Code",
                first_non_empty(
                    sections.get("Code", ""),
                    sections.get("Simple Example", ""),
                    sections.get("Run This Code", ""),
                    defaults["Code"],
                ),
            ),
            (
                "Walkthrough",
                first_non_empty(
                    sections.get("Walkthrough", ""),
                    sections.get("Step-by-Step Working", ""),
                    sections.get("Why This Works", ""),
                    sections.get("Strong Interview Answer", ""),
                    defaults["Walkthrough"],
                ),
            ),
            (
                "Mental Model",
                first_non_empty(
                    sections.get("Mental Model", ""),
                    sections.get("Intuition", ""),
                    sections.get("Quick Visual", ""),
                    sections.get("Comparison Snapshot", ""),
                    defaults["Mental Model"],
                ),
            ),
            (
                "Mistakes",
                first_non_empty(
                    sections.get("Mistakes", ""),
                    sections.get("Common Mistakes", ""),
                    sections.get("❌ Bad Code", ""),
                    sections.get("❌ Bad Mental Model", ""),
                    sections.get("Watch Out", ""),
                    defaults["Mistakes"],
                ),
            ),
            (
                "Tradeoffs",
                first_non_empty(
                    sections.get("Tradeoffs", ""),
                    sections.get("Comparison Snapshot", ""),
                    sections.get("Performance Lens", ""),
                    sections.get("Benchmark Checklist", ""),
                    sections.get("Benchmark Lens", ""),
                    defaults["Tradeoffs"],
                ),
            ),
            (
                "Use / Avoid",
                first_non_empty(
                    sections.get("Use / Avoid", ""),
                    sections.get("When To Use / When Not To Use", ""),
                    sections.get("Use This When", ""),
                    sections.get("Real-World Decision Rule", ""),
                    sections.get("Avoid This When", ""),
                    defaults["Use / Avoid"],
                ),
            ),
            (
                "Practice",
                first_non_empty(
                    sections.get("Practice", ""),
                    sections.get("Exercise", ""),
                    sections.get("Try Next", ""),
                    defaults["Practice"],
                ),
            ),
            (
                "Summary",
                first_non_empty(
                    sections.get("Summary", ""),
                    sections.get("After Reading This, You Should Know", ""),
                    defaults["Summary"],
                ),
            ),
        ]
    )


def chapter_topic_entries(chapter_dir: Path) -> list[dict[str, str]]:
    entries: list[dict[str, str]] = []
    for topic_dir in sorted(chapter_dir.glob("topics/*")):
        if not topic_dir.is_dir():
            continue
        java_file = first_java_file(topic_dir)
        if not java_file:
            continue
        entries.append(
            {
                "title": topic_title(topic_dir),
                "link_label": java_file.name,
                "link_path": f"topics/{topic_dir.name}/{java_file.name}",
            }
        )
    return entries


def section_chapter_entries(section_dir: Path) -> list[dict[str, str]]:
    entries: list[dict[str, str]] = []
    for chapter_dir in sorted(section_dir.glob("ch*")):
        if not chapter_dir.is_dir():
            continue
        entries.append(
            {
                "title": chapter_title(chapter_dir),
                "link_path": f"{chapter_dir.name}/ChapterGuide.md",
            }
        )
    return entries


def normalize_topic(path: Path) -> None:
    front_matter, title, intro, sections = parse_markdown(path)
    topic_dir = path.parent
    visual_mode = parse_front_matter_value(front_matter, "visual")
    visual_asset = parse_front_matter_value(front_matter, "visual_asset")
    java_file = first_java_file(topic_dir)
    if java_file:
        java_meta = parse_java_topic_comment(java_file)
        title = java_meta.get("concept") or title or camel_to_title(java_file.stem)
    else:
        title = title or humanize_slug(topic_dir.name)

    required = topic_sections_from_java(
        java_file,
        title,
        intro,
        sections,
        visual_mode,
        visual_asset,
    )

    parts: list[str] = []
    if front_matter:
        parts.append(front_matter.strip())
        parts.append("")

    parts.append(f"# {title}")
    parts.append("")
    parts.append(f"## {title}")

    for heading, content in required.items():
        parts.append("")
        parts.append(f"**{heading}**")
        parts.append("")
        parts.append(content.strip())

    path.write_text("\n".join(parts).rstrip() + "\n")


def normalize_chapter(path: Path) -> None:
    front_matter, title, intro, sections = parse_markdown(path)
    chapter_dir = path.parent
    if not title:
        title = f"{humanize_slug(chapter_dir.name)} Learning Kit"

    topic_entries = chapter_topic_entries(chapter_dir)
    topics_block = "\n".join(
        f"{index}. Run [{entry['title']}]({entry['link_path']})"
        for index, entry in enumerate(topic_entries, 1)
    )
    if not topics_block:
        topics_block = "No runnable topic files were found for this chapter."

    next_chapter = ""
    sibling_chapters = [path for path in sorted(chapter_dir.parent.glob("ch*")) if path.is_dir()]
    try:
        index = sibling_chapters.index(chapter_dir)
    except ValueError:
        index = -1
    if 0 <= index < len(sibling_chapters) - 1:
        next_dir = sibling_chapters[index + 1]
        next_title = chapter_title(next_dir)
        next_chapter = f"Move to [{next_title}](../{next_dir.name}/ChapterGuide.md) after this chapter."

    required = OrderedDict(
        [
            (
                "Why This Chapter Exists",
                first_non_empty(
                    sections.get("Why This Chapter Exists", ""),
                    sections.get("Why This Chapter Matters", ""),
                    intro,
                    sections.get("What Problem This Chapter Solves", ""),
                    sections.get("The Problem", ""),
                    chapter_defaults(title)["Why This Chapter Exists"],
                ),
            ),
            (
                "The Pain Before It",
                first_non_empty(
                    sections.get("The Pain Before It", ""),
                    sections.get("The Problem", ""),
                    sections.get("What Problem This Chapter Solves", ""),
                    sections.get("Real Problems This Chapter Solves", ""),
                    chapter_defaults(title)["The Pain Before It"],
                ),
            ),
            (
                "Java Creator Mindset",
                first_non_empty(
                    sections.get("Java Creator Mindset", ""),
                    sections.get("Core Ideas", ""),
                    sections.get("What This Chapter Covers", ""),
                    sections.get("Senior Engineer Lens", ""),
                    chapter_defaults(title)["Java Creator Mindset"],
                ),
            ),
            (
                "How You Might Invent It",
                first_non_empty(
                    sections.get("How You Might Invent It", ""),
                    sections.get("The Story", ""),
                    sections.get("Concept Map", ""),
                    sections.get("Visual Map", ""),
                    sections.get("Learning Flow", ""),
                    sections.get("Mental Model", ""),
                    chapter_defaults(title)["How You Might Invent It"],
                ),
            ),
            (
                "Naive Attempt",
                first_non_empty(
                    sections.get("Naive Attempt", ""),
                    sections.get("Compare With", ""),
                    sections.get("Common Confusion", ""),
                    sections.get("Avoid This Mistake", ""),
                    chapter_defaults(title)["Naive Attempt"],
                ),
            ),
            (
                "Why It Breaks",
                first_non_empty(
                    sections.get("Why It Breaks", ""),
                    sections.get("Common Confusion", ""),
                    sections.get("Avoid This Pattern When", ""),
                    sections.get("Avoid This Approach When", ""),
                    sections.get("Avoid Wrong Expectations", ""),
                    sections.get("Avoid Jumping Ahead When", ""),
                    sections.get("OCJP Traps", ""),
                    chapter_defaults(title)["Why It Breaks"],
                ),
            ),
            (
                "Final Java Direction",
                first_non_empty(
                    sections.get("Final Java Direction", ""),
                    sections.get("Core Ideas", ""),
                    sections.get("What This Chapter Covers", ""),
                    sections.get("Quick Summary", ""),
                    sections.get("Deep Dive", ""),
                    chapter_defaults(title)["Final Java Direction"],
                ),
            ),
            ("Study Order", topics_block),
            (
                "What To Notice",
                first_non_empty(
                    sections.get("What To Notice", ""),
                    sections.get("What To Look For", ""),
                    sections.get("Interview Focus", ""),
                    sections.get("Decision Chart", ""),
                    sections.get("Compare With", ""),
                    chapter_defaults(title)["What To Notice"],
                ),
            ),
            (
                "Mental Model",
                first_non_empty(
                    sections.get("Mental Model", ""),
                    sections.get("Right Mental Model", ""),
                    sections.get("Concept Map", ""),
                    sections.get("Visual Map", ""),
                    sections.get("Deep Dive", ""),
                    chapter_defaults(title)["Mental Model"],
                ),
            ),
            (
                "Common Mistakes",
                first_non_empty(
                    sections.get("Common Mistakes", ""),
                    sections.get("Wrong Mental Model", ""),
                    sections.get("Common Confusion", ""),
                    sections.get("Avoid This Mistake", ""),
                    sections.get("OCJP Traps", ""),
                    chapter_defaults(title)["Common Mistakes"],
                ),
            ),
            (
                "Tradeoffs",
                first_non_empty(
                    sections.get("Tradeoffs", ""),
                    sections.get("Compare With", ""),
                    sections.get("What The Compiler Checks", ""),
                    sections.get("What Happens At Runtime", ""),
                    sections.get("Senior Engineer Lens", ""),
                    chapter_defaults(title)["Tradeoffs"],
                ),
            ),
            (
                "Use / Avoid",
                first_non_empty(
                    sections.get("Use / Avoid", ""),
                    sections.get("When To Use / When Not To Use", ""),
                    sections.get("Use This Chapter When", ""),
                    sections.get("Use This Pattern When", ""),
                    sections.get("When To Use", ""),
                    sections.get("When Not To Use", ""),
                    chapter_defaults(title)["Use / Avoid"],
                ),
            ),
            (
                "Practice",
                first_non_empty(
                    sections.get("Practice", ""),
                    sections.get("Quick Quiz", ""),
                    sections.get("Mini Case Study", ""),
                    sections.get("Small Case Study", ""),
                    chapter_defaults(title)["Practice"],
                ),
            ),
            (
                "Summary",
                first_non_empty(
                    sections.get("Summary", ""),
                    sections.get("After Reading This Chapter, You Should Know", ""),
                    sections.get("Quick Summary", ""),
                    chapter_defaults(title)["Summary"],
                ),
            ),
        ]
    )

    appendix = OrderedDict()
    if next_chapter:
        appendix["Next Chapter"] = next_chapter

    write_markdown(path, front_matter, title, required, appendix)


def normalize_section(path: Path) -> None:
    front_matter, _, intro, sections = parse_markdown(path)
    section_dir = path.parent
    title = humanize_slug(section_dir.name)

    chapter_entries = section_chapter_entries(section_dir)
    current_chapters = bullet_list(
        [
            f"[{entry['title']}]({entry['link_path']})"
            for entry in chapter_entries
        ]
    )
    reading_order = numbered_list(
        [
            f"Run [{entry['title']}]({entry['link_path']})"
            for entry in chapter_entries
        ]
    )

    sibling_sections = [path for path in sorted(SOURCE_ROOT.glob("sec*")) if path.is_dir()]
    next_step = section_defaults(title)["Next Step"]
    try:
        index = sibling_sections.index(section_dir)
    except ValueError:
        index = -1
    if 0 <= index < len(sibling_sections) - 1:
        next_dir = sibling_sections[index + 1]
        next_title = humanize_slug(next_dir.name)
        next_step = f"Move to [{next_title}](../{next_dir.name}/SectionGuide.md) after this section."

    defaults = section_defaults(title)
    required = OrderedDict(
        [
            (
                "Why This Section Exists",
                first_non_empty(
                    sections.get("Why This Section Exists", ""),
                    intro,
                    defaults["Why This Section Exists"],
                ),
            ),
            (
                "Real Problems",
                first_non_empty(
                    sections.get("Real Problems", ""),
                    sections.get("What Real Problems This Section Solves", ""),
                    sections.get("Problems", ""),
                    defaults["Real Problems"],
                ),
            ),
            (
                "Start Here If",
                first_non_empty(
                    sections.get("Start Here If", ""),
                    sections.get("If", ""),
                    defaults["Start Here If"],
                ),
            ),
            (
                "How To Read This Section",
                first_non_empty(
                    sections.get("How To Read This Section", ""),
                    defaults["How To Read This Section"],
                ),
            ),
            (
                "Current Chapters",
                first_non_empty(
                    sections.get("Current Chapters", ""),
                    current_chapters,
                    defaults["Current Chapters"],
                ),
            ),
            (
                "Reading Order",
                first_non_empty(
                    sections.get("Reading Order", ""),
                    reading_order,
                    defaults["Reading Order"],
                ),
            ),
            (
                "Common Mistakes",
                first_non_empty(
                    sections.get("Common Mistakes", ""),
                    defaults["Common Mistakes"],
                ),
            ),
            (
                "Practice",
                first_non_empty(
                    sections.get("Practice", ""),
                    defaults["Practice"],
                ),
            ),
            (
                "Next Step",
                first_non_empty(
                    sections.get("Next Step", ""),
                    sections.get("Recommended Next Step", ""),
                    next_step,
                ),
            ),
        ]
    )

    write_markdown(path, front_matter, title, required)


def main() -> int:
    for path in sorted(SOURCE_ROOT.rglob("SectionGuide.md")):
        normalize_section(path)

    for path in sorted(SOURCE_ROOT.rglob("TopicGuide.md")):
        normalize_topic(path)

    for path in sorted(SOURCE_ROOT.rglob("ChapterGuide.md")):
        normalize_chapter(path)

    print("Guide normalization complete.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
