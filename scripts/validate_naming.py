#!/usr/bin/env python3

from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
SOURCE_ROOT = ROOT / "src/main/java/com/learning/javamissing"

RULES = {
    "class_name": {"recommended": 32, "hard": 40},
    "topic_slug": {"recommended": 28, "hard": 42},
    "package_name": {"recommended": 120, "hard": 140},
}


def report(kind: str, level: str, value: str, length: int, path: Path) -> str:
    return f"{level}: {kind} length {length} for '{value}' in {path}"


def main() -> int:
    warnings = []
    errors = []

    for java_file in SOURCE_ROOT.rglob("*.java"):
        if java_file.name in {"RunAll.java", "RunChapter.java", "RunAllTopics.java"}:
            continue

        rel = java_file.relative_to(SOURCE_ROOT)
        class_name = java_file.stem
        package_name = "com.learning.javamissing." + ".".join(rel.parent.parts)

        if len(class_name) > RULES["class_name"]["hard"]:
            errors.append(report("class_name", "ERROR", class_name, len(class_name), rel))
        elif len(class_name) > RULES["class_name"]["recommended"]:
            warnings.append(report("class_name", "WARN", class_name, len(class_name), rel))

        if len(package_name) > RULES["package_name"]["hard"]:
            errors.append(report("package_name", "ERROR", package_name, len(package_name), rel))
        elif len(package_name) > RULES["package_name"]["recommended"]:
            warnings.append(report("package_name", "WARN", package_name, len(package_name), rel))

        if "topics" in rel.parts:
            topic_slug = rel.parts[rel.parts.index("topics") + 1]
            if len(topic_slug) > RULES["topic_slug"]["hard"]:
                errors.append(report("topic_slug", "ERROR", topic_slug, len(topic_slug), rel))
            elif len(topic_slug) > RULES["topic_slug"]["recommended"]:
                warnings.append(report("topic_slug", "WARN", topic_slug, len(topic_slug), rel))

    if warnings:
        print("Naming warnings:")
        for warning in warnings:
            print(warning)
        print()

    if errors:
        print("Naming errors:")
        for error in errors:
            print(error)
        return 1

    print("Naming validation passed.")
    print(
        f"Recommended limits: class_name<={RULES['class_name']['recommended']}, "
        f"topic_slug<={RULES['topic_slug']['recommended']}, "
        f"package_name<={RULES['package_name']['recommended']}"
    )
    print(
        f"Hard limits: class_name<={RULES['class_name']['hard']}, "
        f"topic_slug<={RULES['topic_slug']['hard']}, "
        f"package_name<={RULES['package_name']['hard']}"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
