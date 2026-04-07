#!/usr/bin/env python3

from __future__ import annotations

from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
SOURCE_ROOT = ROOT / "src/main/java/com/learning/javamissing"

FRONT_MATTER_RE = re.compile(r"^---\n([\s\S]*?)\n---\n?", re.MULTILINE)
IMAGE_RE = re.compile(r"!\[[^\]]*\]\(([^)]+)\)")


def parse_front_matter(raw: str) -> dict[str, str]:
    match = FRONT_MATTER_RE.match(raw)
    if not match:
        return {}

    meta: dict[str, str] = {}
    for line in match.group(1).splitlines():
        if ":" not in line:
            continue
        key, value = line.split(":", 1)
        meta[key.strip()] = value.strip()
    return meta


def local_image_paths(raw: str) -> list[str]:
    paths = []
    for image_path in IMAGE_RE.findall(raw):
        path = image_path.strip()
        if path.startswith(("http://", "https://", "data:")):
            continue
        paths.append(path)
    return paths


def main() -> int:
    failures: list[str] = []

    for guide in sorted(SOURCE_ROOT.rglob("TopicGuide.md")):
        raw = guide.read_text()
        meta = parse_front_matter(raw)
        visual_mode = meta.get("visual", "").strip().lower()
        visual_asset = meta.get("visual_asset", "").strip()

        if visual_mode not in {"required", "recommended", "none", ""}:
            failures.append(f"{guide.relative_to(ROOT)}: invalid visual value '{visual_mode}'")
            continue

        if visual_mode != "required":
            continue

        images = local_image_paths(raw)
        if not images:
            failures.append(f"{guide.relative_to(ROOT)}: visual is required but no local markdown image was found")
            continue

        missing_images = []
        for image in images:
            candidate = (guide.parent / image).resolve()
            if not candidate.exists():
                missing_images.append(image)

        if missing_images:
            failures.append(
                f"{guide.relative_to(ROOT)}: missing image asset(s): {', '.join(missing_images)}"
            )

        if visual_asset:
            asset_path = guide.parent / visual_asset
            if not asset_path.exists():
                failures.append(
                    f"{guide.relative_to(ROOT)}: visual_asset '{visual_asset}' does not exist"
                )

    if failures:
        print("Visual lesson validation failed.")
        for failure in failures:
            print(f"- {failure}")
        return 1

    print("Visual lesson validation passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
